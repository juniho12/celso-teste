"use client";

import { useState, useEffect } from "react";
import { GitHubRepository } from "../../types/user";
import {
  ListContainer,
  RepositoryCard,
  RepoHeader,
  RepoName,
  RepoDescription,
  RepoFooter,
  RepoStat,
  Language,
  EmptyMessage,
} from "./RepositoryList.style";

interface RepositoryListProps {
  repositories: GitHubRepository[];
}

const ITEMS_PER_PAGE = 20;

export function RepositoryList({ repositories }: RepositoryListProps) {
  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE);
  const shouldUseLazyLoad = repositories.length > ITEMS_PER_PAGE;

  useEffect(() => {
    setDisplayedCount(ITEMS_PER_PAGE);
  }, [repositories]);

  useEffect(() => {
    if (!shouldUseLazyLoad) return;

    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (scrollPosition >= documentHeight - 500 && displayedCount < repositories.length) {
        setDisplayedCount(prev => Math.min(prev + ITEMS_PER_PAGE, repositories.length));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [displayedCount, repositories.length, shouldUseLazyLoad]);

  if (repositories.length === 0) {
    return (
      <EmptyMessage>
        Nenhum repositório encontrado com os filtros aplicados.
      </EmptyMessage>
    );
  }

  const displayedRepos = shouldUseLazyLoad 
    ? repositories.slice(0, displayedCount)
    : repositories;

  return (
    <ListContainer>
      {displayedRepos.map((repo) => (
        <RepositoryCard key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer">
          <RepoHeader>
            <RepoName>{repo.name}</RepoName>
          </RepoHeader>
          
          {repo.description && (
            <RepoDescription>{repo.description}</RepoDescription>
          )}
          
          <RepoFooter>
            {repo.language && <Language>{repo.language}</Language>}
            <RepoStat>⭐ {repo.stargazers_count.toLocaleString()}</RepoStat>
            <RepoStat>🍴 {repo.forks_count.toLocaleString()}</RepoStat>
          </RepoFooter>
        </RepositoryCard>
      ))}
      {shouldUseLazyLoad && displayedCount < repositories.length && (
        <EmptyMessage>
          Carregando mais repositórios...
        </EmptyMessage>
      )}
    </ListContainer>
  );
}
