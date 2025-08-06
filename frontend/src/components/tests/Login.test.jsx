import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login/Login';

// Mock toast and navigate
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Login Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const setup = () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  };

  test('renders login form inputs', () => {
    setup();
    expect(screen.getByPlaceholderText(/example@email\.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/•{8}/)).toBeInTheDocument(); // Match 8 dots
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('successful login', async () => {
    const mockToken = '123abc';
    const mockUsername = 'rimsha';

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: mockToken, username: mockUsername }),
    });

    setup();

    fireEvent.change(screen.getByPlaceholderText(/example@email\.com/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/•{8}/), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe(mockToken);
      expect(localStorage.getItem('username')).toBe(mockUsername);
      expect(mockedNavigate).toHaveBeenCalledWith('/homepage');
    });
  });

  test('unsuccessful login', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Invalid credentials' }),
    });
  
    setup();
  
    fireEvent.change(screen.getByPlaceholderText(/example@email\.com/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/•{8}/), {
      target: { value: 'wrongpassword' },
    });
  
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
    await waitFor(() => {
      // ✅ Assert that toast.error was called with the right message
      const { toast } = require('react-toastify');
      expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
    });
  });
})