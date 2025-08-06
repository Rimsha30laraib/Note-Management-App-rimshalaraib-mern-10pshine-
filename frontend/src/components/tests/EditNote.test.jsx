import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import EditNote from '../../pages/EditNote';
import { toast } from 'react-toastify';
import axios from 'axios';

jest.mock('axios');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock localStorage
beforeEach(() => {
  localStorage.setItem('token', 'mockToken');
});

afterEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

const renderWithRouter = (ui, { route = '/homepage/editnote/123' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/homepage/editnote/:id" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

describe('EditNote Component', () => {
  test('renders input and editor with fetched data', async () => {
    axios.get.mockResolvedValueOnce({
      data: { title: 'Mock Title', content: '<p>Mock content</p>' },
    });

    renderWithRouter(<EditNote />);

    expect(await screen.findByDisplayValue(/mock title/i)).toBeInTheDocument();
    expect(await screen.findByText(/edit note/i)).toBeInTheDocument();
  });

  test('shows error if saving with empty title or content', async () => {
    axios.get.mockResolvedValueOnce({
      data: { title: '', content: '' },
    });

    renderWithRouter(<EditNote />);

    const saveButton = await screen.findByRole('button', { name: /save/i });
    fireEvent.click(saveButton);

    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
  });

  test('successfully updates note', async () => {
    axios.get.mockResolvedValueOnce({
      data: { title: 'Edit me', content: 'Initial content' },
    });

    axios.put.mockResolvedValueOnce({ status: 200 });

    renderWithRouter(<EditNote />);

    const input = await screen.findByDisplayValue(/edit me/i);
    fireEvent.change(input, { target: { value: 'Updated Title' } });

    const saveBtn = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Note updated successfully!', expect.any(Object));
    });
  });
});