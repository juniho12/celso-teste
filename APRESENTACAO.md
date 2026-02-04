# 🎯 Estrutura de Apresentação - GitHub Explorer

## 📋 Roteiro da Apresentação (15-20 minutos)

### 1. Introdução (2 min)
**O que mostrar:**
- Abrir homepage (`http://localhost:3000`)
- Visão geral das duas features principais

**O que falar:**
```
"Desenvolvi uma aplicação para busca de repositórios e perfis do GitHub.
São duas funcionalidades principais: busca de repositórios com paginação
e visualização de perfis com filtros avançados."
```

**Destaques técnicos:**
- Next.js 16 com App Router
- React 19 com Server/Client Components
- TypeScript para type safety

---

### 2. Feature 1: Busca de Repositórios (4 min)

#### Demonstração da Tela:
1. Navegar para `/repositories`
2. Buscar por "react" ou "javascript"
3. Mostrar resultados com cards
4. Demonstrar paginação funcionando
5. Mostrar contador de resultados

#### Código para Mostrar:

**A. Componente de Busca com Debounce**
```tsx
// src/features/repositories/components/SearchForm/SearchForm.tsx
const [debouncedValue] = useDebounce(searchQuery, 500);
```
**Talking point:** "Implementei debounce de 500ms para evitar requisições desnecessárias"

**B. Custom Hook useRepositories**
```tsx
// src/features/repositories/hooks/useRepositories.ts
const useRepositories = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  // ... lógica de paginação e estado
}
```
**Talking point:** "Separei a lógica de estado em um custom hook para reusabilidade e testabilidade"

**C. Paginação**
```tsx
// src/features/repositories/components/Pagination/Pagination.tsx
const totalPages = Math.ceil(totalResults / itemsPerPage);
```
**Talking point:** "Implementei controle total de paginação com navegação por páginas"

---

### 3. Feature 2: Perfil de Usuário (5 min)

#### Demonstração da Tela:
1. Navegar para `/username`
2. Buscar por um usuário (ex: "octocat", "facebook", "microsoft")
3. Mostrar card de perfil com avatar, bio e estatísticas
4. Demonstrar lista de repositórios
5. Aplicar filtros (linguagem, type)
6. Demonstrar ordenação (stars, forks, updated)
7. **Scroll down** para demonstrar lazy loading (se >20 repos)

#### Código para Mostrar:

**A. Lazy Loading**
```tsx
// src/features/username/components/RepositoryList/RepositoryList.tsx
useEffect(() => {
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      if (displayedCount < allRepositories.length) {
        setDisplayedCount(prev => Math.min(prev + 20, allRepositories.length));
      }
    }
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [displayedCount, allRepositories.length]);
```
**Talking point:** "Implementei lazy loading baseado em scroll para otimizar performance quando há muitos repositórios"

**B. Filtros e Ordenação**
```tsx
// src/features/username/utils/repositoryUtils.ts
export const filterRepositories = (repos, filters) => {
  return repos
    .filter(repo => !filters.language || repo.language === filters.language)
    .filter(repo => !filters.type || ...)
    .sort((a, b) => sortFunction(a, b, filters.sort));
};
```
**Talking point:** "Criei uma utility function pura para filtros e ordenação, facilitando testes e manutenção"

**C. Mapper Pattern**
```tsx
// src/features/username/mappers/user.mapper.ts
export const mapGitHubUserToUser = (data: any): User => ({
  login: data.login,
  name: data.name || data.login,
  avatarUrl: data.avatar_url,
  bio: data.bio || 'Sem bio disponível',
  // ... transformação de dados
});
```
**Talking point:** "Usei o pattern Mapper para desacoplar a API externa da estrutura interna"

---

### 4. Arquitetura e Boas Práticas (4 min)

#### Código para Mostrar:

**A. Feature-Based Structure**
```
src/features/repositories/
  ├── components/     # UI + estilos + testes
  ├── hooks/         # Custom hooks
  ├── services/      # API calls
  ├── mappers/       # Data transformation
  ├── types/         # TypeScript interfaces
  └── utils/         # Helper functions
```
**Talking point:** "Organizei em features auto-contidas, cada uma com sua própria estrutura completa"

**B. Shared Services - Rate Limiter**
```tsx
// src/shared/services/http/githubClient.ts
const requestTimestamps = new Map<string, number[]>();

githubClient.interceptors.request.use((config) => {
  const now = Date.now();
  const timestamps = requestTimestamps.get(key) || [];
  const recentRequests = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS) {
    throw new Error('Rate limit excedido');
  }
  // ...
});
```
**Talking point:** "Implementei um rate limiter global para todas as requisições à API do GitHub, protegendo contra rate limit (60 req/hora sem auth)"

**C. Styled Components Registry (SSR)**
```tsx
// src/app/registry.tsx
export default function StyledComponentsRegistry({ children }) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());
  
  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });
  
  return <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
    {children}
  </StyleSheetManager>;
}
```
**Talking point:** "Configurei SSR corretamente para Styled Components, evitando hydration mismatch"

**D. Next.js Image Optimization**
```tsx
// next.config.ts
images: {
  remotePatterns: [{
    protocol: 'https',
    hostname: 'avatars.githubusercontent.com'
  }]
}

// Uso:
<Image src={avatarUrl} alt={name} width={80} height={80} />
```
**Talking point:** "Aproveitei a otimização nativa de imagens do Next.js"

---

### 5. Testes (3 min)

#### Mostrar Terminal:
```bash
npm test
```
**Ver:** 72 tests passing ✅

#### Código para Mostrar:

**A. Teste de Componente com User Interactions**
```tsx
// src/features/repositories/components/SearchForm/SearchForm.test.tsx
it('calls onSearch after user stops typing', async () => {
  const onSearch = jest.fn();
  render(<SearchForm onSearch={onSearch} />);
  
  const input = screen.getByPlaceholderText(/buscar repositórios/i);
  await userEvent.type(input, 'react');
  
  await waitFor(() => {
    expect(onSearch).toHaveBeenCalledWith('react');
  }, { timeout: 1000 });
});
```
**Talking point:** "Testei interações de usuário com debounce usando React Testing Library"

**B. Teste de Custom Hook**
```tsx
// src/features/username/hooks/useUserSearch.test.ts
it('should search user and fetch repositories', async () => {
  const { result } = renderHook(() => useUserSearch());
  
  await act(async () => {
    await result.current.handleSearch('octocat');
  });
  
  expect(result.current.user).toBeDefined();
  expect(result.current.repositories.length).toBeGreaterThan(0);
});
```
**Talking point:** "Testei hooks isoladamente com renderHook do Testing Library"

**C. Coverage Report**
```bash
npm run test:coverage
```
**Mostrar:** 53.4% cobertura geral, 96%+ em componentes críticos

---

### 6. Build e Performance (2 min)

#### Demonstração:
```bash
npm run build
```
**Mostrar:**
- Build bem-sucedido ✅
- Tamanho dos bundles otimizados
- Rotas estáticas vs dinâmicas

**Talking points:**
- "Build otimizado com route segments"
- "Server Components para reduzir bundle do cliente"
- "Lazy loading reduz payload inicial"

---

## 🎨 Dicas de Apresentação

### Prepare o Ambiente
```bash
# Terminal 1: Dev server rodando
npm run dev

# Terminal 2: Pronto para executar comandos
npm test
npm run build

# Browser: Tabs abertas
- http://localhost:3000
- http://localhost:3000/repositories
- http://localhost:3000/username
```

### Fluxo Recomendado
1. **Homepage** → Explicar visão geral (30s)
2. **Repositories** → Demo + Código (4 min)
3. **Username** → Demo + Código (5 min)
4. **VS Code** → Arquitetura (4 min)
5. **Terminal** → Testes (3 min)
6. **Terminal** → Build (2 min)

### Durante a Demo de Código
- **Split screen:** Browser (50%) + VS Code (50%)
- **Use Ctrl+P** para navegação rápida entre arquivos
- **Prepare snippets** importantes em tabs abertas
- **Zoom in** no código (Ctrl + +)

### Transições Importantes
- "Vamos ver como isso funciona no código..." → Trocar para VS Code
- "Agora vou demonstrar na prática..." → Trocar para Browser
- "Isso está coberto por testes..." → Mostrar arquivo .test.tsx

---

## 💬 Talking Points Técnicos Chave

### 1. Escolhas de Arquitetura
- ✅ **Feature-based** para escalabilidade
- ✅ **Shared services** para reutilização
- ✅ **Mappers** para desacoplamento
- ✅ **Custom hooks** para lógica de estado

### 2. Performance
- ✅ Debounce em inputs
- ✅ Lazy loading (scroll-based)
- ✅ Rate limiting (client-side)
- ✅ Next.js Image optimization
- ✅ Server Components onde possível

### 3. UX
- ✅ Loading states
- ✅ Error handling
- ✅ Empty states
- ✅ Feedback visual (contador, loading)

### 4. Qualidade
- ✅ TypeScript estrito
- ✅ 72 testes unitários
- ✅ Coverage >50%
- ✅ ESLint configurado
- ✅ Build sem erros

### 5. Boas Práticas React/Next.js
- ✅ Server/Client Components separados
- ✅ SSR configurado corretamente
- ✅ App Router (Next.js 14+)
- ✅ Styled Components com registry
- ✅ Separation of concerns

---

## ❓ Perguntas Esperadas e Respostas

### "Por que escolheu Next.js?"
**Resposta:**
- "SSR/SSG out-of-the-box para melhor SEO e performance"
- "App Router moderno com Server Components"
- "Otimizações integradas (Image, Font, etc.)"
- "File-based routing simplifica estrutura"

### "Como você garante qualidade do código?"
**Resposta:**
- "TypeScript para type safety em tempo de desenvolvimento"
- "72 testes unitários com React Testing Library"
- "ESLint para padrões de código"
- "Architecture pattern consistente (feature-based)"

### "Como lidou com rate limiting da API?"
**Resposta:**
- "Implementei um rate limiter client-side que rastreia requisições"
- "Uso Map para armazenar timestamps por endpoint"
- "Limito a 3 requisições por minuto"
- "Mostro feedback claro ao usuário quando excedido"

### "Por que separou em features?"
**Resposta:**
- "Facilita escalabilidade - cada feature é auto-contida"
- "Melhora testabilidade - testes próximos ao código"
- "Reduz acoplamento entre funcionalidades"
- "Time pode trabalhar em features isoladamente"

### "Como testou componentes assíncronos?"
**Resposta:**
- "Usei waitFor e act do React Testing Library"
- "Mockeei serviços com jest.mock"
- "Testei estados de loading e error"
- "Validei interações do usuário com userEvent"

### "O que faria diferente com mais tempo?"
**Resposta:**
- "Implementaria autenticação GitHub para 5000 req/hora"
- "Adicionaria testes E2E com Playwright"
- "Implementaria cache com React Query ou SWR"
- "Adicionaria Storybook para documentação de componentes"
- "Melhoraria acessibilidade (ARIA labels, keyboard navigation)"

---

## 📊 Métricas para Destacar

- ✅ **72 testes** passando
- ✅ **53.4% coverage** geral
- ✅ **0 errors** no build
- ✅ **0 warnings** críticos
- ✅ **2 features** completas
- ✅ **Rate limiting** implementado
- ✅ **Lazy loading** otimizado
- ✅ **SSR** configurado corretamente

---

## 🎯 Ordem de Prioridade (se tiver pouco tempo)

### Must Show (10 min):
1. Demo das duas features funcionando
2. Arquitetura feature-based
3. Rate limiter shared
4. Testes passando

### Nice to Show (5 min):
5. Lazy loading no código
6. Mappers pattern
7. Build bem-sucedido
8. Styled Components Registry

### If Time Allows (5 min):
9. Testes específicos
10. Coverage report
11. Filtros e ordenação no código
12. Next.js config

---

## 🚀 Checklist Pré-Apresentação

### Ambiente
- [ ] Dev server rodando (`npm run dev`)
- [ ] Testes passando (`npm test`)
- [ ] Build bem-sucedido (`npm run build`)
- [ ] VS Code aberto na raiz do projeto
- [ ] Browser com tabs preparadas

### VS Code
- [ ] Zoom adequado (Ctrl + + para aumentar)
- [ ] Arquivos-chave em tabs abertas:
  - [ ] `src/features/repositories/hooks/useRepositories.ts`
  - [ ] `src/features/username/components/RepositoryList/RepositoryList.tsx`
  - [ ] `src/shared/services/http/githubClient.ts`
  - [ ] `src/features/username/mappers/user.mapper.ts`
  - [ ] Algum arquivo `.test.tsx`

### Terminal
- [ ] Terminal limpo e pronto
- [ ] Comandos testados previamente

### Mental
- [ ] Roteiro revisado
- [ ] Talking points memorizados
- [ ] Respostas para perguntas comuns preparadas
- [ ] Cronômetro mental (2-4-5-4-3-2 min)

---

## 🎬 Abertura e Encerramento

### Abertura (30s)
```
"Bom dia/tarde! Vou apresentar o GitHub Explorer, uma aplicação que desenvolvi 
para demonstrar boas práticas de arquitetura front-end. A aplicação tem duas 
features principais: busca de repositórios e perfil de usuários do GitHub.

Vou mostrar primeiro as funcionalidades rodando, depois vou entrar no código 
para explicar as decisões técnicas e arquitetura."
```

### Encerramento (30s)
```
"Resumindo: implementei uma arquitetura escalável baseada em features, com 
separação clara de responsabilidades, rate limiting para proteger contra limites 
da API, lazy loading para performance, e 72 testes unitários para garantir qualidade.

Estou aberto a perguntas sobre qualquer parte do código ou das decisões técnicas!"
```

---

**Boa apresentação! 🚀**
