import { render, screen } from '@testing-library/react';
import RepositoryCard from './Card';
import { Repository } from '../../types/repository';

describe('RepositoryCard', () => {
  const mockRepository: Repository = {
    id: 1,
    name: 'test-repository',
    description: 'A test repository description',
    fullName: 'user/test-repository',
    html_url: 'https://github.com/user/test-repository',
  };

  it('should render repository name', () => {
    render(<RepositoryCard repository={mockRepository} colorIndex={0} />);
    expect(screen.getByText('test-repository')).toBeInTheDocument();
  });

  it('should render repository description', () => {
    render(<RepositoryCard repository={mockRepository} colorIndex={0} />);
    expect(screen.getByText('A test repository description')).toBeInTheDocument();
  });

  it('should render link with correct href', () => {
    render(<RepositoryCard repository={mockRepository} colorIndex={0} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://github.com/user/test-repository');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render without description', () => {
    const repoWithoutDescription = { ...mockRepository, description: null };
    render(<RepositoryCard repository={repoWithoutDescription} colorIndex={0} />);
    expect(screen.getByText('test-repository')).toBeInTheDocument();
    expect(screen.queryByText('A test repository description')).not.toBeInTheDocument();
  });

  it('should truncate long repository name', () => {
    const longNameRepo = {
      ...mockRepository,
      name: 'very-long-repository-name-that-should-be-truncated',
    };
    render(<RepositoryCard repository={longNameRepo} colorIndex={0} />);
    const nameElement = screen.getByRole('heading', { level: 2 });
    expect(nameElement).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    render(<RepositoryCard repository={mockRepository} colorIndex={0} />);
    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();
    expect(screen.getByLabelText(/Abrir repositório test-repository no GitHub/i)).toBeInTheDocument();
  });
});
