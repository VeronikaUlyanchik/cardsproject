import styled, {createGlobalStyle} from "styled-components";


export const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
    overflow-y: scroll;
    scroll-behavior: smooth;

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
  }
`

export const AppWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, #519ce65c, #1976d2);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: black;

`;

interface ContentWrapperProps {
    flex?: string
    width?: string
    height?: string
    direction?: string
}

export const ContentWrapper = styled.div<ContentWrapperProps>`
  width: ${props => props.width};
  height: ${props => props.height};
  display: ${props => props.flex};
  flex-direction: ${props => props.direction};
  justify-content: space-between;
  padding: 30px;
  
  background: rgb(255 255 255 / 45%);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1.7px);
  -webkit-backdrop-filter: blur(1.7px);
  border: 1px solid rgba(255, 255, 255, 0.16);
`;


