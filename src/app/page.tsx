import { getRepositories } from "@/features/repositories/services/repositorySearch.service";
import { mapRepository } from "@/features/repositories/mappers/repository.mapper";
import RepositoryList from "@/features/repositories/components/List/List";
import RepositoryCount from "@/features/repositories/components/Count/Count";
import Pagination from "@/features/repositories/components/Pagination/Pagination";
import SearchForm from "@/features/repositories/components/SearchForm/SearchForm";
import { Header, Results, Title } from "./Global.style";

interface PageProps {
  searchParams?: {
    q?: string;
    page?: string;
  };
}

export default async function RepositoriesPage({ searchParams }: PageProps) {

  const params = await searchParams;
  const query = params?.q ?? "";
  const page = Number(params?.page ?? 1);
  const perPage = 8;

  let repositories = [];
  let totalPages = 0;
  let totalCount = 0;

  if (query) {
    const data = await getRepositories({
      query,
      page,
      perPage,
    });

    repositories = data.items.map(mapRepository);
    totalPages = Math.ceil(data.total_count / perPage);
    totalCount = data.total_count;
  }

  return (
    <main id="main-content" role="main">
      <Header role="banner">
        <Title>
          <strong>Itaú GitHub</strong> <span>Repository Search</span>
        </Title>
        <img 
          src="/github.png" 
          alt="Logo do GitHub" 
          width={60} 
          height={60}
        />
      </Header>

      <SearchForm initialQuery={query} />
      
      <Results 
        role="region" 
        aria-label="Resultados da busca"
        aria-live="polite"
      >
        {query && <RepositoryCount total={totalCount} />}

        {query ? (
          <RepositoryList repositories={repositories} />
        ) : (
          <p 
            style={{ textAlign: 'center', padding: '40px', color: '#666' }}
            role="status"
            tabIndex={0}
          >
            Busque por repositórios para começar
          </p>
        )}

        {totalCount > 0 &&
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            query={query}
          />
         }
      </Results>
    </main>
  );
}
}
