import styled from "styled-components";

export const Results = styled.div`
  background: #F1F2F4;
  border-radius: 15px;
  padding: 25px;
`;

export const Title = styled.h1`
  font-size: 25px;
  color: #000;
  text-align: center;
  margin: 20px 0;
  span {
    font-weight: normal;}
`

export const  Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`

export  const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
  gap: 20px;
  button  {
    background-color: #0070f3;
    padding: 10px 20px;
    border: none;
    color: #fff;
  }
`
