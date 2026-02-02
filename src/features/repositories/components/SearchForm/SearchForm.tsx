"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useTransition } from "react";
import { useDebouncedCallback } from 'use-debounce';
import { Form, SearchingIndicator } from "./SearchForm.style";
import { Search, Loader2 } from 'lucide-react';

interface Props {
  initialQuery: string;
}

export default function SearchForm({ initialQuery }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const debouncedSearch = useDebouncedCallback((value: string) => {
    if (value.trim().length >= 3 || value.trim().length === 0) {
      startTransition(() => {
        router.push(`/?q=${encodeURIComponent(value.trim())}&page=1`);
        setIsSearching(false);
      });
    } else {
      setIsSearching(false);
    }
  }, 600);

  useEffect(() => {
    if (query !== initialQuery) {
      setIsSearching(true);
      debouncedSearch(query);
    }
  }, [query, debouncedSearch, initialQuery]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (query.trim().length >= 3) {
      debouncedSearch.flush();
    }
  }

  const showLoading = isSearching || isPending;
  const isValidQuery = query.trim().length >= 3 || query.trim().length === 0;

  return (
    <Form onSubmit={handleSubmit} role="search">
      <button 
        type="submit" 
        aria-label="Buscar repositórios"
        disabled={!isValidQuery || showLoading}
      >
        {showLoading ? (
          <Loader2 className="spinning" aria-hidden="true" />
        ) : (
          <Search aria-hidden="true" />
        )}
      </button>
      
      <input
        id="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Busque por repositórios (mínimo 3 caracteres)"
        aria-label="Campo de busca de repositórios do GitHub"
        aria-describedby="search-help"
        autoComplete="off"
        type="search"
      />
      
      {!isValidQuery && query.length > 0 && (
        <SearchingIndicator role="status" aria-live="polite">
          Mínimo 3 caracteres
        </SearchingIndicator>
      )}
      
      {showLoading && (
        <SearchingIndicator role="status" aria-live="polite">
          Buscando...
        </SearchingIndicator>
      )}
      
      <span id="search-help" className="visually-hidden">
        Digite ao menos 3 caracteres para buscar repositórios.
      </span>
    </Form>
  );
}
