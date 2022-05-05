import styled from "styled-components";


export const AppWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(75deg, #1eb6b1, #c29aa7);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContentWrapper = styled.div`
  padding: 30px;

  background: rgba(255, 255, 255, 0.18);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1.7px);
  -webkit-backdrop-filter: blur(1.7px);
  border: 1px solid rgba(255, 255, 255, 0.16);
`;


interface ButtonProps {
    color?: string
    bgColor?: string
}

export const Button = styled.button<ButtonProps>`
  color: ${props => props.color || "#edeef1"};
  background-color: ${props => props.bgColor || "#2336f3"};
  width: 100px;
  height: 30px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: #060D64FF;
  }
`;

/*interface InputProps {
    color?: string
    bgColor?: string
}
export const StyledInput = styled.input<InputProps>`
  color: ${props => props.color || "#edeef1"};
  background-color: ${props => props.bgColor || "#2336f3"};
  width: 100px;
  height: 30px;
  border-radius: 10px;

  &:hover {
    background-color: #060D64FF;
  }
`;*/

