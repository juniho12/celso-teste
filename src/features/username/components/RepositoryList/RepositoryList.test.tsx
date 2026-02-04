import { render, screen, within } from '@testing-library/react';
import { RepositoryList } from './RepositoryList';
import { GitHubRepository } from '../../types/user';

describe('RepositoryList', () => {
  const mockRepositories: GitHubRepository[] = [
    {
      id: 1,
      name: 'repo-1',
      full_name: 'user/repo-1',
      html_url: 'https://github.com/user/repo-1',
      description: 'Description 1',
      language: 'TypeScript',
      stargazers_count: 100,
      forks_count: 10,
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-02T00:00:00Z',
    },
    {
      id: 2,
      name: 'repo-2',
      full_name: 'user/repo-2',
      html_url: 'https://github.com/user/repo-2',
      description: 'Description 2',
      language: 'JavaScript',
      stargazers_count: 50,
      forks_count: 5,
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-02T00:00:00Z',
    },
  ];

  it('should render all repositories', () => {
    render(<RepositoryList repositories={mockRepositories} />);
    expect(screen.getByText('repo-1')).toBeInTheDocument();
    expect(screen.getByText('repo-2')).toBeInTheDocument();
  });

  it('should render repository descriptions', () => {
    render(<RepositoryList repositories={mockRepositories} />);
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  it('should render repository languages', () => {
    render(<RepositoryList repositories={mockRepositories} />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });

  it('should render star counts', () => {
    render(<RepositoryList repositories={mockRepositories} />);
    expect(screen.getByText(/⭐\s*100/)).toBeInTheDocument();
    expect(screen.getByText(/⭐\s*50/)).toBeInTheDocument();
  });

  it('should render fork counts', () => {
    render(<RepositoryList repositories={mockRepositories} />);
    expect(screen.getByText(/🍴\s*10/)).toBeInTheDocument();
    expect(screen.getByText(/🍴\s*5/)).toBeInTheDocument();
  });

  it('should render empty message when no repositories', () => {
    render(<RepositoryList repositories={[]} />);
    expect(screen.getByText('Nenhum repositório encontrado com os filtros aplicados.')).toBeInTheDocument();
  });

  it('should render links with correct hrefs', () => {
    render(<RepositoryList repositories={mockRepositories} />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', 'https://github.com/user/repo-1');
    expect(links[1]).toHaveAttribute('href', 'https://github.com/user/repo-2');
  });

  it('should open links in new tab', () => {
    render(<RepositoryList repositories={mockRepositories} />);
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('should implement lazy loading for more than 20 repositories', () => {
    const manyRepos = Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      name: `repo-${i + 1}`,
      full_name: `user/repo-${i + 1}`,
      html_url: `https://github.com/user/repo-${i + 1}`,
      description: `Description ${i + 1}`,
      language: 'TypeScript',
      stargazers_count: 100,
      forks_count: 10,
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-02T00:00:00Z',
    }));

    render(<RepositoryList repositories={manyRepos} />);
    
    // Should initially show 20 items
    expect(screen.getByText('repo-1')).toBeInTheDocument();
    expect(screen.getByText('repo-20')).toBeInTheDocument();
  });
});
