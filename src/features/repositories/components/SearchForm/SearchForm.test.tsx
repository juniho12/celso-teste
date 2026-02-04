import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SearchForm from './SearchForm';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SearchForm', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it('should render search input', () => {
    render(<SearchForm initialQuery="" />);
    expect(screen.getByPlaceholderText(/Busque por repositórios/i)).toBeInTheDocument();
  });

  it('should render search button', () => {
    render(<SearchForm initialQuery="" />);
    expect(screen.getByLabelText('Buscar repositórios')).toBeInTheDocument();
  });

  it('should show initial query value', () => {
    render(<SearchForm initialQuery="react" />);
    const input = screen.getByRole('searchbox');
    expect(input).toHaveValue('react');
  });

  it('should show minimum character warning for short queries', async () => {
    const user = userEvent.setup();
    render(<SearchForm initialQuery="" />);
    
    const input = screen.getByRole('searchbox');
    await user.type(input, 'ab');
    
    expect(screen.getByText('Mínimo 3 caracteres')).toBeInTheDocument();
  });

  it('should trigger debounced search on input change', async () => {
    const user = userEvent.setup();
    render(<SearchForm initialQuery="" />);
    
    const input = screen.getByRole('searchbox');
    await user.type(input, 'react');
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/?q=react&page=1');
    }, { timeout: 1000 });
  });

  it('should submit form on enter key', async () => {
    render(<SearchForm initialQuery="" />);
    
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'vue' } });
    
    const form = screen.getByRole('search');
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalled();
    });
  });

  it('should not disable button for empty query', () => {
    render(<SearchForm initialQuery="" />);
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });

  it('should disable button for invalid short queries', async () => {
    const user = userEvent.setup();
    render(<SearchForm initialQuery="" />);
    
    const input = screen.getByRole('searchbox');
    await user.type(input, 'ab');
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should show searching indicator', async () => {
    const user = userEvent.setup();
    render(<SearchForm initialQuery="" />);
    
    const input = screen.getByRole('searchbox');
    await user.type(input, 'typescript');
    
    expect(screen.getByText('Buscando...')).toBeInTheDocument();
  });
});
