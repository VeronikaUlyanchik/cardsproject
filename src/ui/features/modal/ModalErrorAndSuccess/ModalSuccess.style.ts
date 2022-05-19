import styled from "styled-components";

interface StyledModalSuccessType {
    isSuccessful: boolean
}

export const StyledModalSuccess = styled.div<StyledModalSuccessType>`
  width: 120px;
  color: white;
  background-color: #2e7d32;
  font-size: 26px;
  text-align: center;

  padding: 10px 20px;
  border-radius: 10px;

  position: fixed;
  top: ${props => props.isSuccessful ? '90px' : '-150px'};
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

`

interface StyledModalErrorType {
    isError: boolean
}

export const StyledModalError = styled.div<StyledModalErrorType>`
  width: 120px;
  color: white;
  background-color: #d32f2f;
  font-size: 26px;
  text-align: center;

  padding: 10px 20px;
  border-radius: 10px;

  position: fixed;
  top: ${props => props.isError ? '90px' : '-150px'};
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
`