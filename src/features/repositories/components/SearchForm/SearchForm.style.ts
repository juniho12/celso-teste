import styled from "styled-components";

export const Form = styled.form`
  background: #f1f1f1;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 15px;
  margin: 30px auto;
  max-width: 600px;
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  
  input {
    flex: 1;
    border: none;
    background: #f1f1f1;
    font-size: 16px;
    outline: none;
    padding: 5px 0;
    
    &::placeholder {
      color: #999;
    }
    
    &:focus {
      outline: none;
    }
  }
  
  button {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
    transition: opacity 0.2s;
    
    &:hover:not(:disabled) {
      opacity: 0.7;
    }
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
    
    .spinning {
      animation: spin 1s linear infinite;
    }
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

export const SearchingIndicator = styled.span`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: #666;
  background: #f1f1f1;
  padding: 2px 8px;
  border-radius: 4px;
  pointer-events: none;
`;