import styled from "styled-components";

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #333;
  
  &:focus {
    outline: 2px solid #FF6700;
    outline-offset: 4px;
    border-radius: 8px;
  }
  
  p {
    margin: 0;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
  
  li {
    list-style: none;
  }
`