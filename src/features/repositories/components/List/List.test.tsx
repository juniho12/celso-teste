import { render, screen } from '@testing-library/react';
import RepositoryList from './List';
import { Repository } from '../../types/repository';

jest.mock('../Card/Card', () => {
  return function MockRepositoryCard({ repository }: { repository: Repository }) {
    return <div data-testid={`repo-${repository.id}`}>{repository.name}</div>;
  };
});

describe('RepositoryList', () => {
  const mockRepositories: Repository[] = [
    {
      id: 1,
      name: 'repo-1',
      description: 'Description 1',
      fullName: 'user/repo-1',
      html_url: 'https://github.com/user/repo-1',
    },
    {
      id: 2,
      name: 'repo-2',
      description: 'Description 2',
      fullName: 'user/repo-2',
      html_url: 'https://github.com/user/repo-2',
    },
  ];

  it('should render list of repositories', () => {
    render(<RepositoryList repositories={mockRepositories} />);
    expect(screen.getByTestId('repo-1')).toBeInTheDocument();
    expect(screen.getByTestId('repo-2')).toBeInTheDocument();
  });

  it('should render empty state when no repositories', () => {
    render(<RepositoryList repositories={[]} />);
    expect(screen.getByText('Nenhum repositório encontrado.')).toBeInTheDocument();
    expect(screen.getByText(/Tente ajustar sua busca/i)).toBeInTheDocument();
  });

  it('should have proper list role', () => {
    render(<RepositoryList repositories={mockRepositories} />);
    const list = screen.getByRole('list');
    expect(list).toHaveAttribute('aria-label', 'Lista de 2 repositórios encontrados');
  });

  it('should render correct number of list items', () => {
    render(<RepositoryList repositories={mockRepositories} />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
  });
});
