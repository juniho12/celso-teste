import { repositorySearchClient } from "@/services/http/repositorySearchClient";

interface GetRepositoriesParams {
  query: string;
  page: number;
  perPage: number;
}

export async function getRepositories({
  query,
  page,
  perPage,
}: GetRepositoriesParams) {
  const response = await repositorySearchClient.get("/search/repositories", {
    params: {
      q: query,
      page,
      per_page: perPage,
    },
  });

  return response.data;
}
