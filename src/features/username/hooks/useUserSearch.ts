"use client";

import { useState, useCallback, useEffect } from "react";
import { UserWithRepos, SortOptions } from "../types/user";
import { getUserByUsername, getUserRepositories } from "../services/userSearch.service";
import { mapUserWithRepos } from "../mappers/user.mapper";
import { sortRepositories, filterRepositoriesByName } from "../utils/repositoryUtils";


const CACHE_KEY = "github_user_cache";
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 horas

interface CacheEntry {
  data: UserWithRepos;
  timestamp: number;
}

function saveToCache(username: string, data: UserWithRepos) {
  try {
    const cache = getCacheFromStorage();
    cache[username.toLowerCase()] = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error("Erro ao salvar cache:", error);
  }
}

function getFromCache(username: string): UserWithRepos | null {
  try {
    const cache = getCacheFromStorage();
    const entry = cache[username.toLowerCase()];
    
    if (!entry) return null;
    
    if (Date.now() - entry.timestamp > CACHE_EXPIRATION) {
      delete cache[username.toLowerCase()];
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
      return null;
    }
    
    return entry.data;
  } catch (error) {
    console.error("Erro ao recuperar cache:", error);
    return null;
  }
}

function getCacheFromStorage(): Record<string, CacheEntry> {
  try {
    const cacheStr = localStorage.getItem(CACHE_KEY);
    return cacheStr ? JSON.parse(cacheStr) : {};
  } catch {
    return {};
  }
}

export function useUserSearch() {
  const [data, setData] = useState<UserWithRepos | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: "stars",
    order: "desc",
  });
  const [filterTerm, setFilterTerm] = useState("");

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setError(null);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setError("⚠️ Você está offline. Mostrando dados do cache local.");
    };

    setIsOffline(!navigator.onLine);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const searchUser = useCallback(async (username: string) => {
    if (!username.trim()) {
      setError("Por favor, insira um username válido");
      return;
    }

    if (!navigator.onLine) {
      const cachedData = getFromCache(username);
      if (cachedData) {
        setData(cachedData);
        setError("⚠️ Você está offline. Mostrando dados do cache local.");
        return;
      } else {
        setError("❌ Você está offline e não há dados em cache para este usuário.");
        return;
      }
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
      
      saveToCache(username, mappedData);
    } catch (err: any) {
      if (!navigator.onLine) {
        setError("❌ Conexão perdida durante a busca. Verifique sua internet e tente novamente.");
        
        // Tentar buscar do cache
        const cachedData = getFromCache(username);
        if (cachedData) {
          setData(cachedData);
          setError("⚠️ Conexão perdida. Mostrando dados do cache local.");
        }
      } else if (err.response?.status === 404) {
        setError("❌ Usuário não encontrado. Verifique o username e tente novamente.");
      } else if (err.message?.includes("Rate limit")) {
        setError(err.message);
      } else {
        setError("❌ Erro ao buscar dados do usuário. Tente novamente mais tarde.");
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
    isOffline,
    searchUser,
    sortOptions,
    setSortOptions,
    filterTerm,
    setFilterTerm,
    filteredAndSortedRepos,
  };
}
