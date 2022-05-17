import React, {ChangeEvent, FC, useState} from 'react';
import {Modal} from "../Modal";
import Button from "@mui/material/Button";
import {BtnsBlock, Label, StyledInput, StyledModal, Title} from "../Modal.style";
import ReactDOM from "react-dom";
import styled, {keyframes} from "styled-components";
import {StyledModalSuccess} from "./ModalSuccess.style";

type ModalSuccessPropsType = {
    isModal: boolean
    close: ()=>void
}
export const ModalSuccess: FC<ModalSuccessPropsType> = ({isModal}) => {

    if (!isModal) return null

    return ReactDOM.createPortal(
        <StyledModalSuccess>
            Success
        </StyledModalSuccess>,
        document.body);
};
