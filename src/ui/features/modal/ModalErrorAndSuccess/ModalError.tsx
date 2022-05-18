import React, {FC, useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import {StyledModalError} from "./ModalSuccess.style";
import {useAppDispatch, useAppSelector} from "../../../../hooks/ReduxHooks";
import {setIsError} from "../../../../bll-redux/reducers/AppReducer";


export const ModalError: FC = () => {

    const dispatch = useAppDispatch()
    const isError = useAppSelector(state => state.app.isError)

    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        if (isError) {
            setIsOpen(true);
            let timerId = setTimeout(() => {
                setIsOpen(false)
                dispatch(setIsError(false))
            }, 3000)
        }
    }, [isError]);

    const closeModal = () => {
        setIsOpen(false)
        dispatch(setIsError(false))
    }

    return ReactDOM.createPortal(
        <StyledModalError isError={isOpen} onClick={closeModal}>
            Error
        </StyledModalError>,
        document.body);
};
