import styled, {keyframes} from "styled-components";


const animate = keyframes`
  0% {
    top: -10px
  }
  100% {
    top: 30px
  }
`

export const StyledModalSuccess = styled.div`
  width: 120px;
  color: white;
  background-color: #81cd60;
  font-size: 24px;
  text-align: center;

  padding: 10px 20px;
  border-radius: 10px;
  

  position: absolute;
  left: 50%;
  animation: ${animate} ease-in 1s;
  transform: translateY(-50%);

`

