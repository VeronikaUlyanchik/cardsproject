import React, {FC, ReactNode, useState} from 'react';
import {StyledModal} from "./Modal.style";
import ReactDOM from "react-dom";
import styled from "styled-components";


type ModalPropsType = {
    isModal: boolean
    children: ReactNode
    opacity?: number
}

export const Modal: FC<ModalPropsType> = ({children, isModal, opacity}) => {

    const Block = styled.div`
      &:before {
        content: '';
        background: #000;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: ${opacity ?? 0.6}
      }
    `;

    if (!isModal) return null;

    return ReactDOM.createPortal(
        <Block>
            <StyledModal>
                {children}
            </StyledModal>
        </Block>
        , document.body);
};