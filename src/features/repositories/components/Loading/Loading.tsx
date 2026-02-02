import { LoadingContainer, LoadingText, Spinner } from './Loading.style';

export default function Loading() {
  return (
    <LoadingContainer 
      role="status" 
      aria-live="polite" 
      aria-busy="true"
      aria-label="Carregando repositórios do GitHub"
    >
      <Spinner aria-hidden="true" />
      <LoadingText>Carregando repositórios...</LoadingText>
      <span className="visually-hidden">
        Por favor aguarde, carregando dados dos repositórios.
      </span>
    </LoadingContainer>
  );
}
