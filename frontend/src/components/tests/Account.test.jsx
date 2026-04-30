import React from 'react';
import { render, screen, waitFor, fireEvent, act, within } from '@testing-library/react';
import Account from '../../pages/Account';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

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

jest.mock('axios');

describe('Account Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  const renderComponent = () => {
    render(
      <BrowserRouter>
        <Account />
      </BrowserRouter>
    );
  };

  test('shows loading initially', async () => {
    localStorage.setItem('token', 'token');
    axios.get.mockImplementation(() =>
      new Promise((resolve) => setTimeout(() => resolve({ data: { username: 'rimsha', email: 'test@example.com' } }), 1000))
    );

    renderComponent();

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await act(async () => {
      jest.runAllTimers(); // resolve delayed axios
    });
  });

  test('shows error if token is missing', async () => {
    renderComponent();
    const { toast } = require('react-toastify');

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Token missing. Please login again.');
    });
  });

  test('shows user info if token is present and fetch is successful', async () => {
    localStorage.setItem('token', 'valid-token');

    axios.get.mockResolvedValueOnce({
      data: {
        username: 'rimsha',
        email: 'rimsha@example.com',
      },
    });

    renderComponent();

    await waitFor(() => {
      const usernameBlock = screen.getByText(/username:/i).parentElement;
      const emailBlock = screen.getByText(/email:/i).parentElement;
      expect(within(usernameBlock).getByText('rimsha')).toBeInTheDocument();
      expect(within(emailBlock).getByText('rimsha@example.com')).toBeInTheDocument();
    });
  });

  test('logs out correctly', async () => {
    localStorage.setItem('token', 'valid-token');

    axios.get.mockResolvedValueOnce({
      data: {
        username: 'rimsha',
        email: 'rimsha@example.com',
      },
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/logout/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /logout/i }));

    const { toast } = require('react-toastify');
    expect(toast.success).toHaveBeenCalledWith('Logged out successfully!');

    // Fast-forward the 1-second timeout
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(mockedNavigate).toHaveBeenCalledWith('/login');
  });
});
