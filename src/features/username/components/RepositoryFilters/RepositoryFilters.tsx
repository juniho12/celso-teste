"use client";

import { SortOptions, SortOrder } from "../../types/user";
import {
  FilterContainer,
  FilterGroup,
  Label,
  Input,
  Select,
  SelectGroup,
} from "./RepositoryFilters.style";

interface RepositoryFiltersProps {
  sortOptions: SortOptions;
  onSortChange: (options: SortOptions) => void;
  filterTerm: string;
  onFilterChange: (term: string) => void;
  repositoryCount: number;
}

export function RepositoryFilters({
  sortOptions,
  onSortChange,
  filterTerm,
  onFilterChange,
  repositoryCount,
}: RepositoryFiltersProps) {
  return (
    <FilterContainer>
      <FilterGroup>
        <Label htmlFor="filter-name">Filtrar por nome:</Label>
        <Input
          id="filter-name"
          type="text"
          placeholder="Digite o nome do repositório..."
          value={filterTerm}
          onChange={(e) => onFilterChange(e.target.value)}
        />
      </FilterGroup>

      <SelectGroup>
        <FilterGroup>
          <Label htmlFor="sort-field">Ordenar por:</Label>
          <Select
            id="sort-field"
            value={sortOptions.field}
            onChange={(e) =>
              onSortChange({
                ...sortOptions,
                field: e.target.value as "name" | "stars",
              })
            }
          >
            <option value="name">Nome</option>
            <option value="stars">Estrelas</option>
          </Select>
        </FilterGroup>

        <FilterGroup>
          <Label htmlFor="sort-order">Ordem:</Label>
          <Select
            id="sort-order"
            value={sortOptions.order}
            onChange={(e) =>
              onSortChange({
                ...sortOptions,
                order: e.target.value as SortOrder,
              })
            }
          >
            <option value="asc">Crescente</option>
            <option value="desc">Decrescente</option>
          </Select>
        </FilterGroup>
      </SelectGroup>

      <p style={{ color: "#586069", fontSize: "0.875rem", margin: 0 }}>
        {repositoryCount} {repositoryCount === 1 ? "repositório" : "repositórios"}
      </p>
    </FilterContainer>
  );
}
