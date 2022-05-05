import styled from "styled-components";
import SuperInputText from "./SuperInputText";

export interface InputStyledProps {
    color?: string
    bgColor?: string
}

export const StyledInput = styled(SuperInputText)<InputStyledProps>`
  border: 1px solid #1eb6b1;
  border-radius: 15px;
  font-family: inherit;
  font-size: 16px;
  line-height: inherit;
  color: ${props => props.color || "#020717"};
  background-color: ${props => props.bgColor || "#fff"};
  min-width: 12em;
  margin: 10px 0;
  padding: 8px 10px;

  &:focus {
    box-shadow: inset 0 0 0 3px #fff,
    0 0 0 4px #fff,
      3px -3px 30px #1beabd,
    -3px 3px 30px #10abff;
    outline: none;
  }
`;
