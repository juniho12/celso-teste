"use client";

import { ErrorContainer } from "./Global.style";

interface Props {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  return (
    <ErrorContainer>
      <h2>Algo deu errado 😢</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Tentar novamente</button>
    </ErrorContainer>
  );
}
