import styled from "styled-components";

export const ProfileContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

export const ProfileHeader = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const Avatar = styled.div`
  img {
    border-radius: 50%;
    border: 4px solid #e1e4e8;
  }
`;

export const UserInfo = styled.div`
  flex: 1;
`;

export const UserName = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #24292e;
  margin: 0 0 0.25rem 0;
`;

export const UserLogin = styled.p`
  font-size: 1.25rem;
  color: #586069;
  margin: 0 0 1rem 0;
`;

export const UserBio = styled.p`
  font-size: 1rem;
  color: #24292e;
  line-height: 1.5;
  margin: 0 0 0.75rem 0;
`;

export const LocationText = styled.p`
  font-size: 0.875rem;
  color: #586069;
  margin: 0;
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e1e4e8;
`;

export const StatItem = styled.div`
  text-align: center;
`;

export const StatValue = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: #0366d6;
  margin-bottom: 0.25rem;
`;

export const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #586069;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;
