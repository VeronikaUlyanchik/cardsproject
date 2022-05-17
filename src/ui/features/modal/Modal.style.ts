import styled from "styled-components";

export const StyledModal = styled.div`
  width: 350px;
  min-height: 200px;
  padding: 20px 30px;
  background-color: white;
  border-radius: 10px;

  font-size: 18px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`


export const Title = styled.h3`
  text-align: center;
  color: #0760b8;
  font-size: 24px;
`

export const Label = styled.label`
  display: block;
  margin-top: 20px;
  font-size: 16px;
  font-style: italic;
  font-weight: bold;
`

export const BtnsBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 30px 0 24px;
`

export const StyledInput = styled.input`
  outline: none;
  background: transparent;
  border: transparent;
  font-size: 18px;
  border-bottom: 1px solid #1976d2;
  padding: 10px 0 5px;
  width: 100%;
`

export const Text = styled.p`
  font-size: 18px;
  line-height: 30px;
`

export const RateBlock = styled.div`

`