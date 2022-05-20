import React, {FC, useState} from 'react';
import {Modal} from "../Modal";
import Button from "@mui/material/Button";
import {BtnsBlock, Text, Title} from "../Modal.style";
import {useAppDispatch} from "../../../../hooks/ReduxHooks";
import {Rating} from "../../rating/Rating";
import {updateModalGrade} from "../../../../bll-redux/reducers/CardsReducer";


type ModalLearningAnswerPropsType = {
    packName: string
    question: string
    answer: string
    opacity?: number
    nextHandler: () => void
    card_id: string
}
export const ModalLearningAnswer: FC<ModalLearningAnswerPropsType> =
    ({packName, question, answer, opacity, nextHandler, card_id}) => {

        const dispatch = useAppDispatch()
        const [isModal, setIsModal] = useState<boolean>(false)
        const [grade, setGrade] = useState<number>(1)
        const openModal = () => setIsModal(true)
        const closeModal = () => setIsModal(false)

        const onClickNextHandler = () => {
            setIsModal(false)
            nextHandler()
            dispatch(updateModalGrade(grade, card_id))
        }
        return (
            <>
                <Button color={"primary"} variant="contained" size={"small"} onClick={openModal}>Show Answer</Button>
                <Modal
                    isModal={isModal}
                    opacity={opacity}
                >
                    <Title>Learn “{packName}”</Title>

                    <Text> <b>Question:</b> "{question}" </Text>
                    <Text> <b>Answer:</b> "{answer}" </Text>

                    <Rating grade={grade} setGrade={setGrade} />

                    <BtnsBlock>
                        <Button color={"primary"} variant="outlined" size={"medium"}
                                onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button color={"primary"} variant="contained" size={"medium"}
                                onClick={onClickNextHandler}>
                            Next
                        </Button>
                    </BtnsBlock>
                </Modal>
            </>
        )
    };