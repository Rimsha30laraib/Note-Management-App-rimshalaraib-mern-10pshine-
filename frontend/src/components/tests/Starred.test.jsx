import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import StarredNotes from '../../pages/Starred';
import axios from 'axios';

// Mock libraries
jest.mock('axios');
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));
jest.mock('react-toastify', () => ({
  toast: {
    info: jest.fn(),
    error: jest.fn(),
  },
}));

describe('StarredNotes Component', () => {
  const dummyNotes = [
    {
      _id: '1',
      title: 'Test Note 1',
      content: '<p>This is note 1</p>',
      updatedAt: new Date().toISOString(),
      starred: true,
    },
    {
      _id: '2',
      title: 'Test Note 2',
      content: '<p>This is note 2</p>',
      updatedAt: new Date().toISOString(),
      starred: true,
    },
  ];

  beforeEach(() => {
    localStorage.setItem('token', 'mocked_token');
    axios.get.mockResolvedValue({ data: dummyNotes });
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const renderComponent = () => {
    render(
      <BrowserRouter>
        <StarredNotes />
      </BrowserRouter>
    );
  };

  test('renders notes correctly', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Test Note 1')).toBeInTheDocument();
      expect(screen.getByText('Test Note 2')).toBeInTheDocument();
    });
  });

  test('shows fallback when no notes are returned', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/no starred notes found/i)).toBeInTheDocument();
    });
  });

  test('clicking unstar triggers API and refresh', async () => {
    axios.patch.mockResolvedValue({});
    renderComponent();

    const unstarButtons = await screen.findAllByTitle('Unstar');
    fireEvent.click(unstarButtons[0]);

    await waitFor(() => {
      expect(axios.patch).toHaveBeenCalled();
    });
  });

  test('delete flow opens modal and deletes note', async () => {
    axios.delete.mockResolvedValue({});
    renderComponent();

    const deleteButtons = await screen.findAllByTitle('Delete');
    fireEvent.click(deleteButtons[0]);

    expect(
      screen.getByText(/are you sure you want to delete this note/i)
    ).toBeInTheDocument();

    const confirmButton = screen.getByRole('button', { name: /yes, delete/i });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalled();
    });
  });
});