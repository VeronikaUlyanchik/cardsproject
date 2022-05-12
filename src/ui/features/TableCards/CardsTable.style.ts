import styled from "styled-components";

export const StyledTable = styled.div`
  margin: 0 auto;
  width: 100%;
  border-radius: 10px;
  font-size: 18px;
  box-shadow: 21px 30px 52px 18px rgba(16, 54, 82, 0.22);
`;

export const CardHeader = styled.div`
  width: 100%;
  display: flex;
  //border: 1px solid white;
  border-radius: 10px 10px 0 0 ;
  background: #0760b8;
  color: white;  
`;

interface CardHeaderItemProps {
    width?: string
}
export const CardHeaderItem = styled.div<CardHeaderItemProps>`
  padding: 15px 0;
  font-weight: bold;
  width: ${props=>props.width || "20%"};
`;

interface CardLineProps {
    width?: string
    bgColor: string
}
export const CardLine = styled.div<CardLineProps>`
  width:  100%;
  display: flex;
  background: ${props => props.bgColor || ''};
  &:last-child {
    border-radius: 0 0 10px 10px;
  }
`;

interface CardItemProps {
    width?: string
}
export const CardLineItem = styled.div<CardItemProps>`
  padding: 15px 0;
  width: ${props=>props.width || "20%"};
  
`;