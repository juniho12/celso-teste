"use client";

import { FormEvent, useState } from "react";
import { SearchFormContainer, SearchInput, SearchButton } from "./SearchForm.style";
import { validateGitHubUsername } from "@/features/username/utils/validation";

interface SearchFormProps {
  onSearch: (username: string) => void;
  loading: boolean;
}

export function SearchForm({ onSearch, loading }: SearchFormProps) {
  const [username, setUsername] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const validation = validateGitHubUsername(username);
    
    if (!validation.valid) {
      setValidationError(validation.error!);
      return;
    }
    
    setValidationError(null);
    onSearch(username);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (validationError) {
      setValidationError(null);
    }
  };

  return (
    <SearchFormContainer onSubmit={handleSubmit}>
      <SearchInput
        type="text"
        placeholder="Digite o username do GitHub..."
        value={username}
        onChange={handleChange}
        disabled={loading}
      />
      <SearchButton type="submit" disabled={loading || !username.trim()}>
        {loading ? "Buscando..." : "Buscar"}
      </SearchButton>
      {validationError && (
        <div style={{ color: "#ff4444", marginTop: "8px", fontSize: "14px" }}>
          {validationError}
        </div>
      )}
    </SearchFormContainer>
  );
}
