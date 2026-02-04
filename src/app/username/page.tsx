"use client";

import { SearchForm } from "@/features/username/components/SearchForm/SearchForm";
import { UserProfile } from "@/features/username/components/UserProfile/UserProfile";
import { RepositoryFilters } from "@/features/username/components/RepositoryFilters/RepositoryFilters";
import { RepositoryList } from "@/features/username/components/RepositoryList/RepositoryList";
import { useUserSearch } from "@/features/username/hooks/useUserSearch";
import {
  Container,
  Title,
  ErrorMessage,
  LoadingMessage,
} from "./page.style";

export default function UsernamePage() {
  const {
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
  } = useUserSearch();

  return (
    <Container>
      <Title>GitHub User Search</Title>
      
      {isOffline && !data && (
        <ErrorMessage>⚠️ Você está offline. Busque por usuários já pesquisados anteriormente.</ErrorMessage>
      )}
      
      <SearchForm onSearch={searchUser} loading={loading} />

      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      {loading && <LoadingMessage>Carregando dados do usuário...</LoadingMessage>}

      {data && !loading && (
        <>
          <UserProfile user={data.user} totalStars={data.totalStars} />
          
          <RepositoryFilters
            sortOptions={sortOptions}
            onSortChange={setSortOptions}
            filterTerm={filterTerm}
            onFilterChange={setFilterTerm}
            repositoryCount={filteredAndSortedRepos.length}
          />
          <RepositoryList repositories={filteredAndSortedRepos} />
        </>
      )}
    </Container>
  );
}
