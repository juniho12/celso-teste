import { GitHubRepository, SortOptions } from "../types/user";

export function sortRepositories(
  repositories: GitHubRepository[],
  sortOptions: SortOptions
): GitHubRepository[] {
  const sorted = [...repositories];

  sorted.sort((a, b) => {
    let comparison = 0;

    if (sortOptions.field === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (sortOptions.field === "stars") {
      comparison = a.stargazers_count - b.stargazers_count;
    }

    return sortOptions.order === "asc" ? comparison : -comparison;
  });

  return sorted;
}

export function filterRepositoriesByName(
  repositories: GitHubRepository[],
  searchTerm: string
): GitHubRepository[] {
  if (!searchTerm.trim()) {
    return repositories;
  }

  return repositories.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}
