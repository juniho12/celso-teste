# 🚀 GitHub Explorer

Aplicação web para busca de repositórios e perfis de usuários do GitHub.

## 📋 Sobre

Duas funcionalidades principais:
- **Busca de Repositórios**: Pesquisa com paginação
- **Perfis de Usuários**: Visualização completa com filtros e ordenação

## 🛠️ Stack

- **Next.js 16** + **React 19** + **TypeScript**
- **Styled Components** (CSS-in-JS)
- **Axios** (HTTP client)
- **Jest** + **React Testing Library**

## 🚀 Quick Start

# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

### Scripts Disponíveis

```bash
npm run dev           # Desenvolvimento
npm run build         # Build produção
npm start             # Servidor produção
npm test              # Testes
npm run test:watch    # Testes (watch mode)
npm run test:coverage # Cobertura de testes
npm run lint          # ESLint
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Rotas Next.js (App Router)
│   ├── page.tsx           # Página inicial
│   ├── layout.tsx         # Layout raiz
│   ├── registry.tsx       # Styled Components Registry
│   ├── repositories/      # Rota /repositories
│   └── username/          # Rota /username
│
├── features/              # Features da aplicação
│   ├── repositories/      # Feature de busca de repositórios
│   │   ├── components/    # Componentes React + estilos
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # API calls
│   │   ├── mappers/       # Transformação de dados
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Funções auxiliares
│   │
│   └── username/          # Feature de perfis de usuários
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── mappers/
│       ├── types/
│       └── utils/
│
├── shared/                # Recursos compartilhados
│   └── services/
│       └── http/
│           └── githubClient.ts  # Cliente HTTP + rate limiter
│
└── services/              # Services específicos (legacy)
    └── http/
```

## 🏗️ Arquitetura

### Feature-Based
Cada feature é auto-contida com:
- **components/** - UI + estilos + testes
- **hooks/** - Lógica de estado
- **services/** - Chamadas à API
- **mappers/** - Transformação de dados
- **types/** - Interfaces TypeScript
- **utils/** - Funções auxiliares

### Shared Services
**`shared/services/http/githubClient.ts`**
- Cliente Axios configurado
- Rate limiting (3 requisições/minuto)
- Interceptors para tratamento de erros
- Headers configurados para GitHub API

### Services por Feature
- **repositories**: `repositorySearch.service.ts`
- **username**: `userSearch.service.ts`

Cada service usa o `githubClient` compartilhado.

## 🌐 Rotas

- **`/`** - Página inicial com menu
- **`/repositories`** - Busca de repositórios
- **`/username`** - Busca de usuários

## 🧪 Testes

```bash
npm test              # Executar todos os testes
npm run test:watch    # Watch mode
npm run test:coverage # Relatório de cobertura
```

## 📦 Build & Deploy

### Build Local

```bash
npm run build
npm start
```

### Deploy

#### Netlify
- Configuração já incluída em `netlify.toml`

### API GitHub
- Limite: 60 requisições/hora (sem auth)
- Rate limiter interno: 3 req/minuto
- Endpoints:
  - `/search/repositories`
  - `/users/{username}`
  - `/users/{username}/repos`

## 🐛 Troubleshooting

### Rate Limit Excedido
```
Rate limit excedido. Aguarde...
```
**Solução**: Aguarde 1 minuto (limiter interno) ou 1 hora (API GitHub)

### Erros de Build
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Hydration Mismatch
Já resolvido com `registry.tsx` no layout

## 📚 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [GitHub API](https://docs.github.com/en/rest)
- [Styled Components](https://styled-components.com/docs)
- [Jest](https://jestjs.io/docs/getting-started)

## 📝 Licença

Projeto educacional desenvolvido com Next.js 16, React 19 e TypeScript.
