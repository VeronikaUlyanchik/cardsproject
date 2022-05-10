import styled from "styled-components";


export const ProfileWrapper = styled.div`
  margin: 0 auto;
  width: 450px;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Title = styled.h3`
  font-size: 28px;
  color: #0865c0;
  margin: 20px 0;
`;

export const ImageBlock = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 3px solid #1976d2;
  margin: 20px 0;
  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  vertical-align: middle;
`;

export const InputBlock = styled.div`
  margin: 20px 0 40px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  outline: none;
`;

export const StyledInput = styled.input`
  outline: none;
  background: transparent;
  border: transparent;
  color: #062e6e;
  font-size: 20px;
  border-bottom: 1px solid #1976d2;
  padding: 10px;
  width: 300px;
`;