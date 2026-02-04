"use client";

import { FormEvent, useState } from "react";
import { SearchFormContainer, SearchInput, SearchButton } from "./SearchForm.style";

interface SearchFormProps {
  onSearch: (username: string) => void;
  loading: boolean;
}

export function SearchForm({ onSearch, loading }: SearchFormProps) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(username);
  };

  return (
    <SearchFormContainer onSubmit={handleSubmit}>
      <SearchInput
        type="text"
        placeholder="Digite o username do GitHub..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={loading}
      />
      <SearchButton type="submit" disabled={loading || !username.trim()}>
        {loading ? "Buscando..." : "Buscar"}
      </SearchButton>
    </SearchFormContainer>
  );
}
