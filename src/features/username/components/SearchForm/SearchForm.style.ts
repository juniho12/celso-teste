import styled from "styled-components";

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 600px;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 0.875rem 1rem;
  border: 2px solid #e1e4e8;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #0366d6;
    box-shadow: 0 0 0 3px rgba(3, 102, 214, 0.1);
  }

  &:disabled {
    background-color: #f6f8fa;
    cursor: not-allowed;
  }
`;

export const SearchButton = styled.button`
  padding: 0.875rem 2rem;
  background-color: #0366d6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: #0256c7;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(3, 102, 214, 0.2);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
  }
`;
