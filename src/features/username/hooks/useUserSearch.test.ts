import { renderHook, waitFor, act } from '@testing-library/react';
import { useUserSearch } from './useUserSearch';
import * as userService from '../services/userSearch.service';

jest.mock('../services/userSearch.service');

describe('useUserSearch', () => {
  const mockUser = {
    id: 1,
    login: 'testuser',
    name: 'Test User',
    avatar_url: 'https://avatars.githubusercontent.com/u/1',
    bio: 'Test bio',
    location: 'Test Location',
    followers: 100,
    following: 50,
    public_repos: 25,
  };

  const mockRepositories = [
    {
      id: 1,
      name: 'repo-1',
      html_url: 'https://github.com/testuser/repo-1',
      description: 'Description 1',
      language: 'TypeScript',
      stargazers_count: 100,
      forks_count: 10,
    },
    {
      id: 2,
      name: 'repo-2',
      html_url: 'https://github.com/testuser/repo-2',
      description: 'Description 2',
      language: 'JavaScript',
      stargazers_count: 50,
      forks_count: 5,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useUserSearch());
    
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.sortOptions).toEqual({ field: 'stars', order: 'desc' });
    expect(result.current.filterTerm).toBe('');
  });

  it('should search user successfully', async () => {
    (userService.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
    (userService.getUserRepositories as jest.Mock).mockResolvedValue(mockRepositories);

    const { result } = renderHook(() => useUserSearch());

    await act(async () => {
      await result.current.searchUser('testuser');
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBeTruthy();
    });

    expect(result.current.data?.user.login).toBe('testuser');
    expect(result.current.error).toBeNull();
  });

  it('should handle 404 error', async () => {
    const error = { response: { status: 404 } };
    (userService.getUserByUsername as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useUserSearch());

    await act(async () => {
      await result.current.searchUser('nonexistent');
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toContain('Usuário não encontrado');
    });

    expect(result.current.data).toBeNull();
  });

  it('should handle rate limit error', async () => {
    const error = { message: 'Rate limit excedido' };
    (userService.getUserByUsername as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useUserSearch());

    await act(async () => {
      await result.current.searchUser('testuser');
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toContain('Rate limit excedido');
    });
  });

  it('should handle empty username', async () => {
    const { result } = renderHook(() => useUserSearch());

    await act(async () => {
      await result.current.searchUser('');
    });

    await waitFor(() => {
      expect(result.current.error).toContain('insira um username válido');
    });
    
    expect(userService.getUserByUsername).not.toHaveBeenCalled();
  });

  it('should filter repositories by name', async () => {
    (userService.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
    (userService.getUserRepositories as jest.Mock).mockResolvedValue(mockRepositories);

    const { result } = renderHook(() => useUserSearch());

    await act(async () => {
      await result.current.searchUser('testuser');
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setFilterTerm('repo-1');
    });

    await waitFor(() => {
      expect(result.current.filteredAndSortedRepos).toHaveLength(1);
      expect(result.current.filteredAndSortedRepos[0].name).toBe('repo-1');
    });
  });

  it('should sort repositories by stars descending', async () => {
    (userService.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
    (userService.getUserRepositories as jest.Mock).mockResolvedValue(mockRepositories);

    const { result } = renderHook(() => useUserSearch());

    await act(async () => {
      await result.current.searchUser('testuser');
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.filteredAndSortedRepos).toHaveLength(2);
    });

    expect(result.current.filteredAndSortedRepos[0].stargazers_count).toBe(100);
    expect(result.current.filteredAndSortedRepos[1].stargazers_count).toBe(50);
  });

  it('should change sort options', async () => {
    (userService.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
    (userService.getUserRepositories as jest.Mock).mockResolvedValue(mockRepositories);

    const { result } = renderHook(() => useUserSearch());

    await act(async () => {
      await result.current.searchUser('testuser');
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setSortOptions({ field: 'name', order: 'asc' });
    });

    await waitFor(() => {
      expect(result.current.sortOptions).toEqual({ field: 'name', order: 'asc' });
    });
  });
});
