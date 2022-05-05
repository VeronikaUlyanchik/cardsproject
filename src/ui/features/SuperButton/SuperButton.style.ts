import styled from "styled-components";

export interface ButtonStyledProps {
    color?: string
    bgColor?: string
    className?: string
}

export const StyledButton = styled.button<ButtonStyledProps>`
  color: ${props => props.color || "#fff"};
  background-color: ${props => props.bgColor || "#c29aa7"};
  border: #1beabd;
  width: 100px;
  height: 35px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  margin: 20px 0;

  &:hover {
    background-color: #1beabd;
    color: #000;
  }
`;
