import React, {ChangeEvent, FC, useState} from 'react';
import {Modal} from "../Modal";
import Button from "@mui/material/Button";
import {BtnsBlock, Label, StyledInput, Title} from "../Modal.style";

type ModalAddCardPropsType = {
    addCard: (title: string) => void
}
export const ModalAddCard: FC<ModalAddCardPropsType> = ({addCard}) => {

        const [isModal, setIsModal] = useState<boolean>(false)
        const [title, setTitle] = useState<string>('')

        const openModal = () => setIsModal(true)
        const closeModal = () => setIsModal(false)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
        }

        return (
            <>
                <Button color={"success"} variant="contained" size={"medium"}
                        onClick={openModal}>
                    Add Card
                </Button>
                <Modal
                    isModal={isModal}
                >
                    <Title>Add new card</Title>
                    <Label htmlFor="name">Card name</Label>
                    <StyledInput
                        autoFocus
                        type={"text"}
                        value={title}
                        onChange={onChangeHandler}
                    />
                    <BtnsBlock>
                        <Button color={"primary"} variant="outlined" size={"medium"}
                                onClick={closeModal}
                        >
                            Cancel
                        </Button>
                        <Button
                            color={"primary"} variant="contained" size={"medium"}
                            onClick={() => addCard(title)}
                        >
                            Save
                        </Button>
                    </BtnsBlock>
                </Modal>
            </>
        );
    };