import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchForm } from './SearchForm';

describe('SearchForm (username)', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render search input', () => {
    render(<SearchForm onSearch={mockOnSearch} loading={false} />);
    expect(screen.getByPlaceholderText('Digite o username do GitHub...')).toBeInTheDocument();
  });

  it('should render search button', () => {
    render(<SearchForm onSearch={mockOnSearch} loading={false} />);
    expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument();
  });

  it('should call onSearch when form is submitted', async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={mockOnSearch} loading={false} />);
    
    const input = screen.getByPlaceholderText('Digite o username do GitHub...');
    await user.type(input, 'testuser');
    
    const button = screen.getByRole('button', { name: /buscar/i });
    fireEvent.click(button);
    
    expect(mockOnSearch).toHaveBeenCalledWith('testuser');
  });

  it('should disable button when loading', () => {
    render(<SearchForm onSearch={mockOnSearch} loading={true} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should disable button when input is empty', () => {
    render(<SearchForm onSearch={mockOnSearch} loading={false} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should show "Buscando..." text when loading', () => {
    render(<SearchForm onSearch={mockOnSearch} loading={true} />);
    expect(screen.getByText('Buscando...')).toBeInTheDocument();
  });

  it('should disable input when loading', () => {
    render(<SearchForm onSearch={mockOnSearch} loading={true} />);
    const input = screen.getByPlaceholderText('Digite o username do GitHub...');
    expect(input).toBeDisabled();
  });

  it('should update input value on change', async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={mockOnSearch} loading={false} />);
    
    const input = screen.getByPlaceholderText('Digite o username do GitHub...') as HTMLInputElement;
    await user.type(input, 'newuser');
    
    expect(input.value).toBe('newuser');
  });

  it('should trim whitespace when submitting', async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={mockOnSearch} loading={false} />);
    
    const input = screen.getByPlaceholderText('Digite o username do GitHub...');
    await user.type(input, '  testuser  ');
    
    const button = screen.getByRole('button', { name: /buscar/i });
    fireEvent.click(button);
    
    expect(mockOnSearch).toHaveBeenCalledWith('  testuser  ');
  });
});
