"use client";

import { useRouter } from "next/navigation";
import { PaginationContainer } from "./Pagination.style";

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
    router.push(`/?q=${query}&page=${page}`);
  }

  return (
    <PaginationContainer>
      <button
        disabled={currentPage <= 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        Anterior
      </button>

      <span>
        Página {currentPage} de {totalPages}
      </span>

      <button
        disabled={currentPage >= totalPages}
        onClick={() => goToPage(currentPage + 1)}
      >
        Próxima
      </button>
    </PaginationContainer>
  );
}
