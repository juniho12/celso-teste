import { githubClient } from "@/shared/services/http/githubClient";
import { GitHubUser, GitHubRepository } from "../types/user";

export async function getUserByUsername(username: string): Promise<GitHubUser> {
  const response = await githubClient.get<GitHubUser>(`/users/${username}`);
  return response.data;
}

export async function getUserRepositories(username: string): Promise<GitHubRepository[]> {
  const response = await githubClient.get<GitHubRepository[]>(`/users/${username}/repos`, {
    params: {
      per_page: 100,
      sort: "updated",
    },
  });
  return response.data;
}
