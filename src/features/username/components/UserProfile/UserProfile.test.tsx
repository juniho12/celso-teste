import { render, screen } from '@testing-library/react';
import { UserProfile } from './UserProfile';
import { GitHubUser } from '../../types/user';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { priority, width, height, ...rest } = props;
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...rest} width={width} height={height} />;
  },
}));

describe('UserProfile', () => {
  const mockUser: GitHubUser = {
    id: 1,
    login: 'testuser',
    name: 'Test User',
    avatar_url: 'https://avatars.githubusercontent.com/u/1',
    bio: 'A test user bio',
    location: 'Test City',
    followers: 100,
    following: 50,
    public_repos: 25,
  };

  it('should render user name', () => {
    render(<UserProfile user={mockUser} totalStars={500} />);
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('should render user login', () => {
    render(<UserProfile user={mockUser} totalStars={500} />);
    expect(screen.getByText('@testuser')).toBeInTheDocument();
  });

  it('should render user bio', () => {
    render(<UserProfile user={mockUser} totalStars={500} />);
    expect(screen.getByText('A test user bio')).toBeInTheDocument();
  });

  it('should render user location', () => {
    render(<UserProfile user={mockUser} totalStars={500} />);
    expect(screen.getByText('📍 Test City')).toBeInTheDocument();
  });

  it('should render follower count', () => {
    render(<UserProfile user={mockUser} totalStars={500} />);
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Followers')).toBeInTheDocument();
  });

  it('should render following count', () => {
    render(<UserProfile user={mockUser} totalStars={500} />);
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('Following')).toBeInTheDocument();
  });

  it('should render repositories count', () => {
    render(<UserProfile user={mockUser} totalStars={500} />);
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('Repositories')).toBeInTheDocument();
  });

  it('should render total stars', () => {
    render(<UserProfile user={mockUser} totalStars={500} />);
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('Total Stars')).toBeInTheDocument();
  });

  it('should use login when name is not available', () => {
    const userWithoutName = { ...mockUser, name: null };
    render(<UserProfile user={userWithoutName} totalStars={500} />);
    expect(screen.getByText('testuser')).toBeInTheDocument();
  });

  it('should not render bio when not available', () => {
    const userWithoutBio = { ...mockUser, bio: null };
    render(<UserProfile user={userWithoutBio} totalStars={500} />);
    expect(screen.queryByText('A test user bio')).not.toBeInTheDocument();
  });

  it('should not render location when not available', () => {
    const userWithoutLocation = { ...mockUser, location: null };
    render(<UserProfile user={userWithoutLocation} totalStars={500} />);
    expect(screen.queryByText(/📍/)).not.toBeInTheDocument();
  });

  it('should render avatar with correct src', () => {
    render(<UserProfile user={mockUser} totalStars={500} />);
    const avatar = screen.getByAltText('testuser');
    expect(avatar).toHaveAttribute('src', 'https://avatars.githubusercontent.com/u/1');
  });
});
