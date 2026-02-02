import RepositoryCard from "../Card/Card";
import { Repository } from "../../types/repository";
import { List } from "./List.style";

interface RepositoryListProps {
  repositories: Repository[];
}

export default function RepositoryList({
  repositories,
}: RepositoryListProps) {
  if (!repositories.length) {
    return <p>Nenhum repositório encontrado.</p>;
  }

  return (
    <List>
      {repositories.map((repo, index) => (
        <RepositoryCard key={repo.id} repository={repo} colorIndex={index} />
      ))}
    </List >
  );
}
