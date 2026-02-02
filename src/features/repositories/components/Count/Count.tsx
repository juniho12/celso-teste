import { CountContainer } from "./Count.style";

interface RepositoryCountProps {
  total: number;
}

export default function RepositoryCount({
  total,
}: RepositoryCountProps) {
  const resultText = total === 1 ? 'resultado encontrado' : 'resultados encontrados';
  
  return (
    <CountContainer 
      role="status" 
      aria-live="polite"
      aria-label={`${total} ${resultText}`}
    >
      <strong aria-hidden="false">{total.toLocaleString('pt-BR')}</strong>{' '}
      <span aria-hidden="false">{resultText}</span>
    </CountContainer>
  );
}
