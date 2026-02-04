"use client";

import { Search, User } from "lucide-react";
import {
  Container,
  Card,
  Title,
  Subtitle,
  MenuGrid,
  MenuCard,
  MenuTitle,
  MenuDescription,
  AboutSection,
  AboutTitle,
  AboutText,
  FeatureList,
  FeatureItem,
} from "./page.style";

export default function HomePage() {
  return (
    <Container>
      <Card>
        <Title>
          <strong>GitHub</strong> Explorer
        </Title>
        <Subtitle>
          Explore repositórios e perfis de usuários do GitHub de forma intuitiva e eficiente
        </Subtitle>

        <MenuGrid>
          <MenuCard href="/repositories">
            <Search />
            <MenuTitle>Repositórios</MenuTitle>
            <MenuDescription>
              Busque e explore repositórios do GitHub com filtros avançados e paginação
            </MenuDescription>
          </MenuCard>

          <MenuCard href="/username">
            <User />
            <MenuTitle>Usuários</MenuTitle>
            <MenuDescription>
              Visualize perfis de usuários, estatísticas e seus repositórios públicos
            </MenuDescription>
          </MenuCard>
        </MenuGrid>

        <AboutSection>
          <AboutTitle>Sobre o Projeto</AboutTitle>
          <AboutText>
            Esta aplicação foi desenvolvida com Next.js 16, React 19 e TypeScript e Styled Components.
          </AboutText>
          
          <FeatureList>
            <FeatureItem>Busca de repositórios</FeatureItem>
            <FeatureItem>Perfis de usuários</FeatureItem>
            <FeatureItem>Lazy loading</FeatureItem>
            <FeatureItem>Rate limiting</FeatureItem>
            <FeatureItem>Testes unitários</FeatureItem>
            <FeatureItem>TypeScript</FeatureItem>
            <FeatureItem>Styled Components</FeatureItem>
            <FeatureItem>Acessibilidade</FeatureItem>
          </FeatureList>

          <AboutText style={{ marginTop: '1.5rem' }}>
            Desenvolvido com foco em performance, acessibilidade e experiência do usuário.
          </AboutText>
        </AboutSection>
      </Card>
    </Container>
  );
}
