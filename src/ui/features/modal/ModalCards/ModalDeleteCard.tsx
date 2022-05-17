import React, {FC, useState} from 'react';
import {Modal} from "../Modal";
import Button from "@mui/material/Button";
import {Input} from "@mui/material";
import {BtnsBlock, Text, Title} from "../Modal.style";

type ModalDeleteCardPropsType = {
    deleteCard: () => void
}
export const ModalDeleteCard: FC<ModalDeleteCardPropsType> =
    ({deleteCard}) => {

        const [isModal, setIsModal] = useState<boolean>(false)
        const openModal = () => setIsModal(true)
        const closeModal = () => setIsModal(false)

        return (
            <>
                <Button color={"primary"} variant="contained" size={"small"}
                        onClick={openModal}>
                    Delete
                </Button>
                <Modal
                    isModal={isModal}
                >
                    <Title>Delete card</Title>
                    <Text>
                        Do you really want to remove <b>card</b> ?
                        This card will be excluded from this course.
                    </Text>
                    <BtnsBlock>
                        <Button color={"primary"} variant="contained" size={"medium"}
                                onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button color={"error"} variant="contained" size={"medium"}
                                onClick={deleteCard}>
                            Delete
                        </Button>
                    </BtnsBlock>
                </Modal>
            </>
        );
    };