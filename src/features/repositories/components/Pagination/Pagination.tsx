"use client";

import { useRouter } from "next/navigation";
import { PaginationContainer } from "./Pagination.style";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  currentPage: number;
  totalPages: number;
  query: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  query,
}: Props) {
  const router = useRouter();

  function goToPage(page: number) {
    router.push(`/?q=${encodeURIComponent(query)}&page=${page}`);
  }

  return (
    <PaginationContainer
      role="navigation"
      aria-label="Navegação de páginas de resultados"
    >
      <button
        disabled={currentPage <= 1}
        onClick={() => goToPage(currentPage - 1)}
        aria-label={`Ir para página anterior (página ${currentPage - 1})`}
        aria-disabled={currentPage <= 1}
      >
        <ChevronLeft aria-hidden="true" size={18} />
        <span>Anterior</span>
      </button>

      <span 
        aria-current="page"
        aria-label={`Página ${currentPage} de ${totalPages}`}
        role="status"
      >
        Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
      </span>

      <button
        disabled={currentPage >= totalPages}
        onClick={() => goToPage(currentPage + 1)}
        aria-label={`Ir para próxima página (página ${currentPage + 1})`}
        aria-disabled={currentPage >= totalPages}
      >
        <span>Próxima</span>
        <ChevronRight aria-hidden="true" size={18} />
      </button>
    </PaginationContainer>
  );
}
