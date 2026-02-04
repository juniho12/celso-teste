import styled from "styled-components";

export const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

export const RepositoryCard = styled.a`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

export const RepoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const RepoName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #0366d6;
  margin: 0;
  word-break: break-word;

  ${RepositoryCard}:hover & {
    text-decoration: underline;
  }
`;

export const RepoDescription = styled.p`
  font-size: 0.875rem;
  color: #586069;
  line-height: 1.5;
  margin: 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const RepoFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  font-size: 0.75rem;
  color: #586069;
  margin-top: auto;
`;

export const RepoStat = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const Language = styled.span`
  padding: 0.25rem 0.5rem;
  background-color: #f1f8ff;
  color: #0366d6;
  border-radius: 12px;
  font-weight: 600;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #586069;
  font-size: 1.125rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;
