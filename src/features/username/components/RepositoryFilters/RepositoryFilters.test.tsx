import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RepositoryFilters } from './RepositoryFilters';
import { SortOptions } from '../../types/user';

describe('RepositoryFilters', () => {
  const mockSortOptions: SortOptions = {
    field: 'stars',
    order: 'desc',
  };
  const mockOnSortChange = jest.fn();
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render filter input', () => {
    render(
      <RepositoryFilters
        sortOptions={mockSortOptions}
        onSortChange={mockOnSortChange}
        filterTerm=""
        onFilterChange={mockOnFilterChange}
        repositoryCount={10}
      />
    );
    expect(screen.getByLabelText('Filtrar por nome:')).toBeInTheDocument();
  });

  it('should render sort field select', () => {
    render(
      <RepositoryFilters
        sortOptions={mockSortOptions}
        onSortChange={mockOnSortChange}
        filterTerm=""
        onFilterChange={mockOnFilterChange}
        repositoryCount={10}
      />
    );
    expect(screen.getByLabelText('Ordenar por:')).toBeInTheDocument();
  });

  it('should render sort order select', () => {
    render(
      <RepositoryFilters
        sortOptions={mockSortOptions}
        onSortChange={mockOnSortChange}
        filterTerm=""
        onFilterChange={mockOnFilterChange}
        repositoryCount={10}
      />
    );
    expect(screen.getByLabelText('Ordem:')).toBeInTheDocument();
  });

  it('should display repository count', () => {
    render(
      <RepositoryFilters
        sortOptions={mockSortOptions}
        onSortChange={mockOnSortChange}
        filterTerm=""
        onFilterChange={mockOnFilterChange}
        repositoryCount={10}
      />
    );
    expect(screen.getByText('10 repositórios')).toBeInTheDocument();
  });

  it('should display singular when count is 1', () => {
    render(
      <RepositoryFilters
        sortOptions={mockSortOptions}
        onSortChange={mockOnSortChange}
        filterTerm=""
        onFilterChange={mockOnFilterChange}
        repositoryCount={1}
      />
    );
    expect(screen.getByText('1 repositório')).toBeInTheDocument();
  });

  it('should call onFilterChange when typing in filter input', async () => {
    const user = userEvent.setup();
    render(
      <RepositoryFilters
        sortOptions={mockSortOptions}
        onSortChange={mockOnSortChange}
        filterTerm=""
        onFilterChange={mockOnFilterChange}
        repositoryCount={10}
      />
    );
    
    const input = screen.getByLabelText('Filtrar por nome:');
    await user.type(input, 'react');
    
    expect(mockOnFilterChange).toHaveBeenCalledTimes(5); // once per character
  });

  it('should call onSortChange when changing sort field', () => {
    render(
      <RepositoryFilters
        sortOptions={mockSortOptions}
        onSortChange={mockOnSortChange}
        filterTerm=""
        onFilterChange={mockOnFilterChange}
        repositoryCount={10}
      />
    );
    
    const select = screen.getByLabelText('Ordenar por:');
    fireEvent.change(select, { target: { value: 'name' } });
    
    expect(mockOnSortChange).toHaveBeenCalledWith({
      field: 'name',
      order: 'desc',
    });
  });

  it('should call onSortChange when changing sort order', () => {
    render(
      <RepositoryFilters
        sortOptions={mockSortOptions}
        onSortChange={mockOnSortChange}
        filterTerm=""
        onFilterChange={mockOnFilterChange}
        repositoryCount={10}
      />
    );
    
    const select = screen.getByLabelText('Ordem:');
    fireEvent.change(select, { target: { value: 'asc' } });
    
    expect(mockOnSortChange).toHaveBeenCalledWith({
      field: 'stars',
      order: 'asc',
    });
  });

  it('should display current filter term', () => {
    render(
      <RepositoryFilters
        sortOptions={mockSortOptions}
        onSortChange={mockOnSortChange}
        filterTerm="react"
        onFilterChange={mockOnFilterChange}
        repositoryCount={10}
      />
    );
    
    const input = screen.getByLabelText('Filtrar por nome:') as HTMLInputElement;
    expect(input.value).toBe('react');
  });
});
