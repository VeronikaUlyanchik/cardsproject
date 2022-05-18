import React, {FC, useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import {StyledModalSuccess} from "./ModalSuccess.style";
import {useAppDispatch, useAppSelector} from "../../../../hooks/ReduxHooks";
import {setIsSuccessful} from "../../../../bll-redux/reducers/AppReducer";


export const ModalSuccess: FC = () => {

    const dispatch = useAppDispatch()
    const isSuccessful = useAppSelector(state => state.app.isSuccessful)

    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        if (isSuccessful) {
            setIsOpen(true);
            setTimeout(() => {
                setIsOpen(false)
                dispatch(setIsSuccessful(false))
            }, 3000)
        }
    }, [isSuccessful]);

    const closeModal = () => {
        setIsOpen(false)
        dispatch(setIsSuccessful(false))
    }

    return ReactDOM.createPortal(
        <StyledModalSuccess isSuccessful={isOpen} onClick={closeModal}>
            Success
        </StyledModalSuccess>,
        document.body);
};
