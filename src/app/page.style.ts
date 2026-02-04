import styled from "styled-components";
import Link from "next/link";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

export const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 3rem;
  max-width: 800px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
  
  strong {
    color: #667eea;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #666;
  text-align: center;
  margin-bottom: 3rem;
  line-height: 1.6;
`;

export const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

export const MenuCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 12px;
  text-decoration: none;
  color: #333;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    border-color: #667eea;
  }

  svg {
    width: 48px;
    height: 48px;
    color: #667eea;
  }
`;

export const MenuTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

export const MenuDescription = styled.p`
  font-size: 0.875rem;
  color: #666;
  text-align: center;
  margin: 0;
`;

export const AboutSection = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid #e5e7eb;
`;

export const AboutTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
`;

export const AboutText = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.8;
  margin-bottom: 0.75rem;
`;

export const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #555;

  &:before {
    content: "✓";
    color: #667eea;
    font-weight: bold;
    font-size: 1.2rem;
  }
`;
