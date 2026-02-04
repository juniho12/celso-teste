import { GitHubUser, GitHubRepository, UserWithRepos } from "../types/user";

export function mapUserWithRepos(
  user: GitHubUser,
  repositories: GitHubRepository[]
): UserWithRepos {
  const totalStars = repositories.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );

  return {
    user,
    repositories,
    totalStars,
  };
}
