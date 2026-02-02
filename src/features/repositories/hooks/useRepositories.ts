"use client";

import { useEffect, useState } from "react";
import { getRepositories } from "../services/repositorySearch.service";

export function useRepositories(query: string) {
  const [data, setData] = useState(null);

  useEffect(() => {
    getRepositories({ query, page: 1, perPage: 10 }).then(setData);
  }, [query]);
  return { data };
}
