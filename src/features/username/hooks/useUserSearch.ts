"use client";

import { useState, useCallback } from "react";
import { UserWithRepos, SortOptions } from "../types/user";
import { getUserByUsername, getUserRepositories } from "../services/userSearch.service";
import { mapUserWithRepos } from "../mappers/user.mapper";
import { sortRepositories, filterRepositoriesByName } from "../utils/repositoryUtils";

export function useUserSearch() {
  const [data, setData] = useState<UserWithRepos | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: "stars",
    order: "desc",
  });
  const [filterTerm, setFilterTerm] = useState("");

  const searchUser = useCallback(async (username: string) => {
    if (!username.trim()) {
      setError("Por favor, insira um username válido");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const [user, repositories] = await Promise.all([
        getUserByUsername(username),
        getUserRepositories(username),
      ]);

      const mappedData = mapUserWithRepos(user, repositories);
      setData(mappedData);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError("Usuário não encontrado. Verifique o username e tente novamente.");
      } else if (err.message?.includes("Rate limit")) {
        setError(err.message);
      } else {
        setError("Erro ao buscar dados do usuário. Tente novamente mais tarde.");
      }
      console.error("Erro ao buscar usuário:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredAndSortedRepos = data
    ? sortRepositories(
        filterRepositoriesByName(data.repositories, filterTerm),
        sortOptions
      )
    : [];

  return {
    data,
    loading,
    error,
    searchUser,
    sortOptions,
    setSortOptions,
    filterTerm,
    setFilterTerm,
    filteredAndSortedRepos,
  };
}
