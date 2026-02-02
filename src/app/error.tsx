"use client";

import { ErrorContainer } from "./Global.style";

interface Props {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  return (
    <ErrorContainer 
      role="alert" 
      aria-live="assertive"
      aria-labelledby="error-title"
      aria-describedby="error-message"
    >
      <h2 id="error-title">Algo deu errado 😢</h2>
      <p id="error-message">{error.message}</p>
      <button 
        onClick={reset}
        aria-label="Tentar carregar a página novamente"
      >
        Tentar novamente
      </button>
    </ErrorContainer>
  );
}
