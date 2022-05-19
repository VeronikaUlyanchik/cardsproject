import React, {FC, useState} from 'react';
import {Modal} from "../Modal";
import Button from "@mui/material/Button";
import {BtnsBlock, Text, Title} from "../Modal.style";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


const ratesArray = [
    {value: 1, label: "Did not know"},
    {value: 2, label: "Forgot"},
    {value: 3, label: "A lot of thought"},
    {value: 4, label: "Сonfused"},
    {value: 5, label: "Knew the answer"}
]
type ModalLearningAnswerPropsType = {
    packName: string
    question: string
    answer: string
    opacity?: number
    nextHandler: ()=> void
}
export const ModalLearningAnswer: FC<ModalLearningAnswerPropsType> =
    ({packName, question, answer, opacity, nextHandler}) => {

        const [isModal, setIsModal] = useState<boolean>(false)
        const openModal = () => setIsModal(true)
        const closeModal = () => setIsModal(false)

        const onClickNextHandler = () => {
            setIsModal(false)
            nextHandler()
        }
        return (
            <>
                <Button color={"primary"} variant="contained" size={"small"} onClick={openModal}>Show Answer</Button>
                <Modal
                    isModal={isModal}
                    opacity={opacity}
                >
                    <Title>Learn “{packName}”</Title>

                    <Text><b>Question:</b> "{question}"</Text>
                    <Text><b>Answer:</b> "{answer}"</Text>

                        <FormControl>
                            <Text><b>Rate yourself:</b></Text>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={3}
                                name="radio-buttons-group"
                            >
                                {ratesArray.map(item => {
                                    return <FormControlLabel
                                        key={item.value}
                                        value={item.value}
                                        control={<Radio/>}
                                        label={item.label}
                                    />
                                })}
                            </RadioGroup>
                        </FormControl>

                    <BtnsBlock>
                        <Button color={"primary"} variant="outlined" size={"medium"}
                                onClick={closeModal}>Cancel</Button>
                        <Button color={"primary"} variant="contained" size={"medium"} onClick={onClickNextHandler}>Next</Button>
                    </BtnsBlock>
                </Modal>
            </>
        );
    };