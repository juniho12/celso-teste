"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form } from "./SearchForm.style";
import { Search } from 'lucide-react';

interface Props {
  initialQuery: string;
}

export default function SearchForm({ initialQuery }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/?q=${query}&page=1`);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <button type="submit"><Search /></button>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="busque  por repositórios"
      />
    </Form>
  );
}
