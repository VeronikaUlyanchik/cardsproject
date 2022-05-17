import React, {ChangeEvent, FC, useState} from 'react';
import {Modal} from "../Modal";
import Button from "@mui/material/Button";
import {BtnsBlock, Label, StyledInput, Title} from '../Modal.style';


type ModalEditCardPropsType = {
    question: string
    answer: string
    updateCard: (question: string, answer: string) => void
}
export const ModalEditCard: FC<ModalEditCardPropsType> =
    ({question, answer, updateCard}) => {

        const [isModal, setIsModal] = useState<boolean>(false)
        const openModal = () => setIsModal(true)
        const closeModal = () => setIsModal(false)

        return (
            <>
                <Button color={"primary"} variant="contained" size={"small"} onClick={openModal}>Edit</Button>
                <Modal
                    isModal={isModal}
                >
                    <CardInfoBlock
                        answer={answer}
                        question={question}
                        closeModal={closeModal}
                        updateCard={updateCard}
                    />
                </Modal>
            </>
        );
    };


type CardInfoBlockPropsType = {
    question: string
    answer: string
    closeModal: () => void
    updateCard: (question: string, answer: string) => void
}
const CardInfoBlock: FC<CardInfoBlockPropsType> = ({question, answer, closeModal, updateCard}) => {
    const [questionTitle, setQuestionTitle] = useState<string>(question)
    const [answerTitle, setAnswerTitle] = useState<string>(answer)

    const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setQuestionTitle(e.currentTarget.value)
    }
    const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAnswerTitle(e.currentTarget.value)
    }


    return (
        <>
            <Title>Card Info</Title>
            <Label htmlFor="question">Question</Label>
            <StyledInput
                type={"text"}
                name={"question"}
                value={questionTitle}
                onChange={onChangeQuestionHandler}
            />
            {
                answer &&
                <>
                    <Label htmlFor="answer">Answer</Label>
                    <StyledInput
                        type={"text"}
                        name={"answer"}
                        value={answerTitle}
                        onChange={onChangeAnswerHandler}
                    />
                </>
            }
            <BtnsBlock>
                <Button color={"primary"} variant="contained" size={"medium"} onClick={closeModal}>Back</Button>
                <Button color={"success"} variant="contained" size={"medium"}
                        onClick={() => updateCard(questionTitle, answerTitle)}>Save</Button>
            </BtnsBlock>
        </>
    )
}

