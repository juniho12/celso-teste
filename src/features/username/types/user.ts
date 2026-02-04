export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  location: string | null;
  public_repos: number;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
  created_at: string;
  updated_at: string;
}

export interface UserWithRepos {
  user: GitHubUser;
  repositories: GitHubRepository[];
  totalStars: number;
}

export type SortOrder = "asc" | "desc";

export interface SortOptions {
  field: "name" | "stars";
  order: SortOrder;
}
