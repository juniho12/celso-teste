import { LoadingContainer, LoadingText, Spinner } from './Loading.style';

export default function Loading() {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>Carregando repositórios...</LoadingText>
    </LoadingContainer>
  );
}
