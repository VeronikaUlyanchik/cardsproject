import styled from "styled-components";

export const StyledTable = styled.div`
  width: 100%;
  height: 70%;
  border-radius: 10px;
  font-size: 18px;
  box-shadow: 21px 30px 52px 18px rgba(16, 54, 82, 0.22);
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 4px; /* ширина для вертикального скролла */
    height: 90%; /* высота для горизонтального скролла */
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 20px;
    border-radius: 20px;
    height: 50px;
    margin-top: 30px;
    margin-bottom: 30px;
    background: #09173f;
    position: relative;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
    -webkit-border-radius: 20px;
    margin-top: 30px;
    margin-bottom: 30px;
    border-radius: 20px;
  }
`;

export const PackHeader = styled.div`
  width: 100%;
  display: flex;
  border-radius: 10px 10px 0 0;
  background: #0760b8;
  color: white;

`;

interface PackHeaderItemProps {
    width?: string
}

export const PackHeaderItem = styled.div<PackHeaderItemProps>`
  padding: 15px 0;
  font-weight: bold;
  width: ${props => props.width || "20%"};
`;


interface CardLineProps {
    width?: string
    bgColor: string
}

export const CardLine = styled.div<CardLineProps>`
  width: 100%;
  display: flex;
  //border: 1px solid white;
  //border-radius: 10px;
  background: ${props => props.bgColor || ''};

  &:last-child {
    border-radius: 0 0 10px 10px;
  }
`;

interface CardItemProps {
    width?: string
}

export const CardItem = styled.div<CardItemProps>`
  padding: 15px 0;
  width: ${props => props.width || "20%"};

`;