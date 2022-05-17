import React, {ChangeEvent, FC, useState} from 'react';
import {Modal} from "../Modal";
import Button from "@mui/material/Button";
import {BtnsBlock, Label, StyledInput, Title} from '../Modal.style';


type ModalEditPackPropsType = {
    packName: string
    updatePack: (packName: string) => void
}
export const ModalEditPack: FC<ModalEditPackPropsType> =
    ({packName, updatePack}) => {

        const [isModal, setIsModal] = useState<boolean>(false)
        const [title, setTitle] = useState<string>(packName)
        const openModal = () => setIsModal(true)
        const closeModal = () => setIsModal(false)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setTitle(e.currentTarget.value)
        }

        return (
            <>
                <Button color={"primary"} variant="contained" size={"small"} onClick={openModal}>Edit</Button>
                <Modal
                    isModal={isModal}
                >
                    <Title>Pack Info</Title>
                    <Label htmlFor="question">Pack Name</Label>
                    <StyledInput
                        autoFocus
                        type={"text"}
                        value={title}
                        onChange={onChangeHandler}
                    />
                    <BtnsBlock>
                        <Button color={"primary"} variant="contained" size={"medium"}
                                onClick={closeModal}>Cancel</Button>
                        <Button color={"success"} variant="contained" size={"medium"}
                                onClick={() => updatePack(title)}>Save</Button>
                    </BtnsBlock>
                </Modal>
            </>
        );
    };