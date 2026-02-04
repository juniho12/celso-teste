import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Pagination', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it('should render current page and total pages', () => {
    render(<Pagination currentPage={2} totalPages={10} query="react" />);
    expect(screen.getByText(/Página/)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('should disable previous button on first page', () => {
    render(<Pagination currentPage={1} totalPages={10} query="react" />);
    const prevButton = screen.getByLabelText(/página anterior/i);
    expect(prevButton).toBeDisabled();
  });

  it('should disable next button on last page', () => {
    render(<Pagination currentPage={10} totalPages={10} query="react" />);
    const nextButton = screen.getByLabelText(/próxima página/i);
    expect(nextButton).toBeDisabled();
  });

  it('should navigate to previous page', () => {
    render(<Pagination currentPage={5} totalPages={10} query="react" />);
    const prevButton = screen.getByLabelText(/página anterior/i);
    fireEvent.click(prevButton);
    expect(mockPush).toHaveBeenCalledWith('/?q=react&page=4');
  });

  it('should navigate to next page', () => {
    render(<Pagination currentPage={5} totalPages={10} query="react" />);
    const nextButton = screen.getByLabelText(/próxima página/i);
    fireEvent.click(nextButton);
    expect(mockPush).toHaveBeenCalledWith('/?q=react&page=6');
  });

  it('should have proper navigation role', () => {
    render(<Pagination currentPage={1} totalPages={5} query="react" />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Navegação de páginas de resultados');
  });

  it('should encode query in URL', () => {
    render(<Pagination currentPage={1} totalPages={5} query="react hooks" />);
    const nextButton = screen.getByLabelText(/próxima página/i);
    fireEvent.click(nextButton);
    expect(mockPush).toHaveBeenCalledWith('/?q=react%20hooks&page=2');
  });
});
