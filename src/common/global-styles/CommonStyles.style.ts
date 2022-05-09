import styled, {createGlobalStyle} from "styled-components";


export const GlobalStyle = createGlobalStyle({})

export const AppWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(75deg, #1eb6b1, #c29aa7);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: black;
 
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


