import React, {FC, useState} from 'react';
import {Modal} from "../Modal";
import Button from "@mui/material/Button";
import {BtnsBlock, Text, Title} from "../Modal.style";
import {ModalLearningAnswer} from "./ModalLearningAnswer";

type ModalLearningCardContainerPropsType = {
    packName: string
    question: string
}
export const ModalLearningCard: FC<ModalLearningCardContainerPropsType> =
    ({packName, question}) => {

        const [isModal, setIsModal] = useState<boolean>(false)
        const openModal = () => setIsModal(true)
        const closeModal = () => setIsModal(false)

        return (
            <>
                <Button color={"primary"} variant="contained" size={"small"} onClick={openModal}>Learn</Button>
                <Modal
                    isModal={isModal}

                >
                    <Title>Learn “{packName}”</Title>
                    <Text><b>Question:</b> "{question}"</Text>
                    <BtnsBlock>
                        <Button color={"primary"} variant="outlined" size={"medium"}
                                onClick={closeModal}>Cancel</Button>
                        <ModalLearningAnswer packName={packName} question={question} answer={'Blablabla'} opacity={0}/>
                    </BtnsBlock>
                </Modal>
            </>
        );
    };