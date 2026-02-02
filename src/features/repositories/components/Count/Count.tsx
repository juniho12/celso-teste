import { CountContainer } from "./Count.style";

interface RepositoryCountProps {
  total: number;
}

export default function RepositoryCount({
  total,
}: RepositoryCountProps) {
  return (
    <CountContainer>
      <strong>{total}</strong> resultados  encontrados<span>...</span>
    </CountContainer>
  );
}
