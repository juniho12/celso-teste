import styled  from "styled-components";

export const PaginationContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px 0;
  
  button {
    background-color: #FFF;
    padding: 10px 15px; 
    border: 2px solid #ddd;
    border-radius: 8px;
    color: #000;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
    
    &:hover:not(:disabled) {
      background-color: #FF6700;
      color: white;
      border-color: #FF6700;
      transform: translateY(-2px);
    }
    
    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      background-color: #f5f5f5;
    }
    
    &:focus-visible {
      outline: 3px solid #FF6700;
      outline-offset: 2px;
    }
  }
  
  span[role="status"] {
    color: #333;
    font-size: 14px;
    
    strong {
      color: #FF6700;
      font-weight: 700;
    }
  }
`