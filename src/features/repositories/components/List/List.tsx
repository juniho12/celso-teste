import RepositoryCard from "../Card/Card";
import { Repository } from "../../types/repository";
import { List, EmptyState } from "./List.style";

interface RepositoryListProps {
  repositories: Repository[];
}

export default function RepositoryList({
  repositories,
}: RepositoryListProps) {
  if (!repositories.length) {
    return (
      <EmptyState 
        role="status" 
        aria-live="polite"
        tabIndex={0}
      >
        <p>Nenhum repositório encontrado.</p>
        <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
          Tente ajustar sua busca ou use termos diferentes.
        </p>
      </EmptyState>
    );
  }

  return (
    <List 
      role="list"
      aria-label={`Lista de ${repositories.length} repositórios encontrados`}
    >
      {repositories.map((repo, index) => (
        <li key={repo.id} role="listitem">
          <RepositoryCard repository={repo} colorIndex={index} />
        </li>
      ))}
    </List>
  );
}
