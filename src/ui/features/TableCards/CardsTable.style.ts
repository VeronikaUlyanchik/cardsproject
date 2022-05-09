import styled from "styled-components";

export const StyledTable = styled.div`
  width: 690px;
  border: 1px solid #2e3750;
  border-radius: 10px;
`;

export const PackHeader = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid #2e3750;
  
`;

interface PackHeaderItemProps {
    width?: string
}
export const PackHeaderItem = styled.div<PackHeaderItemProps>`
  padding: 10px 0;
  font-weight: bold;
  width: ${props=>props.width || "20%"};
`;

export const CardLine = styled.div`
  width:  100%;
  display: flex;
  
`;

interface CardItemProps {
    width?: string
}
export const CardItem = styled.div<CardItemProps>`
  padding: 10px 0;
  width: ${props=>props.width || "20%"};
  
`;