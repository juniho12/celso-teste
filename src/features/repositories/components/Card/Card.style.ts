import  styled from  'styled-components' ;

export const Card = styled.article`
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  &:hover {
    .card-header img {
      display: none;
    }
    .card-content {
      min-height: 240px;
    }
  }
`

export const CardHeader = styled.div<{ $bgColor: string }>`
  background-color: ${props => props.$bgColor};
  display: flex;
  justify-content: center;
  padding: 25px;
  border-radius: 15px 15px 0 0;
  transition: all 0.3s ease;
`

export const CardContent= styled.div`
  padding: 20px;
  border-radius: 0 0 15px 15px;
  background-color: #DEDEDE;
  height: 170px;
  transition: all 0.3s ease;
  h2 {
    margin: 5px 0 15px 0;
    text-transform: capitalize;
    transition: all 0.3s ease;
  }
  
  p {
    transition: all 0.3s ease;
  }
`