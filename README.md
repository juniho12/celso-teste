# 🔍 GitHub Repository Search

Aplicação web desenvolvida em Next.js para busca e visualização de repositórios do GitHub com interface intuitiva e paginação.

## 📋 Sobre o Projeto

Esta aplicação permite aos usuários pesquisar repositórios no GitHub através da API pública, visualizando informações detalhadas como descrição, linguagem de programação, número de estrelas, forks e issues abertas. A aplicação conta com paginação, limite de requisições e design responsivo.

## ✨ Funcionalidades

- 🔎 **Busca de Repositórios**: Pesquisa em tempo real usando a API do GitHub
- 📄 **Paginação**: Navegação facilitada entre páginas de resultados (8 itens por página)
- 📊 **Informações Detalhadas**: Visualização de estatísticas dos repositórios
- 🎨 **Interface Responsiva**: Design adaptável para diferentes tamanhos de tela
- ⚡ **Rate Limiting**: Controle de requisições para evitar limite da API
- 🔄 **Loading States**: Feedback visual durante carregamento
- 🚨 **Error Handling**: Tratamento de erros com mensagens amigáveis

## 🛠️ Tecnologias Utilizadas

- **[Next.js 16.1.6](https://nextjs.org/)** - Framework React com SSR
- **[React 19.2.3](https://react.dev/)** - Biblioteca para interfaces de usuário
- **[TypeScript 5](https://www.typescriptlang.org/)** - Tipagem estática
- **[Styled Components 6.3.8](https://styled-components.com/)** - CSS-in-JS
- **[Axios 1.13.4](https://axios-http.com/)** - Cliente HTTP
- **[Lucide React 0.563.0](https://lucide.dev/)** - Biblioteca de ícones
- **[ESLint](https://eslint.org/)** - Linter para qualidade de código

## 📁 Estrutura do Projeto

```
celso-teste/
├── src/
│   ├── app/                          # App Router do Next.js
│   │   ├── page.tsx                  # Página principal
│   │   ├── layout.tsx                # Layout raiz
│   │   ├── loading.tsx               # Estado de loading
│   │   ├── error.tsx                 # Página de erro
│   │   ├── globals.css               # Estilos globais
│   │   └── Global.style.ts           # Componentes estilizados globais
│   │
│   ├── features/
│   │   └── repositories/             # Feature de repositórios
│   │       ├── components/           # Componentes React
│   │       │   ├── Card/             # Card individual de repositório
│   │       │   ├── Count/            # Contador de resultados
│   │       │   ├── List/             # Lista de repositórios
│   │       │   ├── Loading/          # Skeleton loading
│   │       │   ├── Pagination/       # Componente de paginação
│   │       │   └── SearchForm/       # Formulário de busca
│   │       ├── hooks/                # React Hooks customizados
│   │       │   └── useRepositories.ts
│   │       ├── mappers/              # Mapeamento de dados
│   │       │   └── repository.mapper.ts
│   │       ├── services/             # Lógica de negócio
│   │       │   └── repositorySearch.service.ts
│   │       ├── types/                # Definições TypeScript
│   │       │   └── repository.ts
│   │       └── utils/                # Funções utilitárias
│   │           ├── const.tsx
│   │           └── utils.tsx
│   │
│   └── services/
│       └── http/                     # Configuração HTTP
│           └── repositorySearchClient.ts  # Cliente Axios com rate limiter
│
├── public/                           # Arquivos estáticos
├── package.json                      # Dependências do projeto
├── tsconfig.json                     # Configuração TypeScript
├── next.config.ts                    # Configuração Next.js
└── eslint.config.mjs                 # Configuração ESLint
```

## 🚀 Como Executar o Projeto

### Pré-requisitos

- **Node.js** versão 18 ou superior
- **npm**, **yarn**, **pnpm** ou **bun**

### Instalação

1. **Clone o repositório**:
```bash
git clone <url-do-repositorio>
cd celso-teste
```

2. **Instale as dependências**:
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Execute o servidor de desenvolvimento**:
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. **Acesse a aplicação**:
   
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📜 Scripts Disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Cria a build de produção
npm run start    # Inicia o servidor de produção
npm run lint     # Executa o linter ESLint
```

## 🏗️ Arquitetura e Padrões

### Feature-Based Structure
O projeto utiliza uma estrutura baseada em features, organizando o código por funcionalidades ao invés de tipos técnicos. Isso facilita a manutenção e escalabilidade.

### Separation of Concerns
- **Components**: Componentes de apresentação puros
- **Hooks**: Lógica reutilizável de estado
- **Services**: Camada de comunicação com APIs
- **Mappers**: Transformação de dados
- **Types**: Definições de tipos TypeScript

### Rate Limiting
A aplicação implementa um rate limiter customizado para controlar requisições à API do GitHub, evitando bloqueios por excesso de chamadas.

## 🎨 Componentes Principais

### SearchForm
Formulário de busca com validação e feedback visual.

### RepositoryList
Lista de repositórios com renderização otimizada.

### Card
Card individual exibindo informações detalhadas de cada repositório.

### Pagination
Componente de navegação entre páginas de resultados.

### Count
Exibe o total de resultados encontrados.

## 🔧 Configurações Importantes

### API do GitHub
A aplicação utiliza a API pública do GitHub sem autenticação. O limite de requisições é de 60 por hora por IP.

### Rate Limiter
- **Máximo de requisições**: 3 por consulta
- **Janela de tempo**: 60 segundos
- **Comportamento**: Bloqueia temporariamente requisições excessivas

## 🌐 Deploy

### Vercel (Recomendado)

A maneira mais fácil de fazer deploy é usando a [Vercel Platform](https://vercel.com/new):

1. Faça push do código para um repositório Git
2. Importe o projeto na Vercel
3. A Vercel detectará automaticamente Next.js e configurará o build

### Outras Plataformas

Para deploy em outras plataformas, execute:

```bash
npm run build
npm run start
```

Certifique-se de que a plataforma suporta Node.js 18+ e Next.js 16.

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📝 Boas Práticas para Desenvolvimento

- Siga os padrões do ESLint configurado
- Utilize TypeScript para todas as novas funcionalidades
- Mantenha componentes pequenos e focados
- Escreva código limpo e documentado
- Teste as funcionalidades antes de commitar
- Use commits semânticos (feat, fix, docs, etc.)

## 🐛 Troubleshooting

### Erro de Rate Limit
Se você atingir o limite da API do GitHub:
- Aguarde 1 hora para o reset automático
- Considere implementar autenticação OAuth para aumentar o limite

### Erros de Build
```bash
# Limpe o cache e reinstale dependências
rm -rf .next node_modules
npm install
npm run build
```

## 📚 Recursos Adicionais

- [Documentação Next.js](https://nextjs.org/docs)
- [API do GitHub](https://docs.github.com/en/rest)
- [Styled Components](https://styled-components.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📄 Licença

Este projeto é privado e de uso educacional.

---

Desenvolvido com ❤️ usando Next.js
