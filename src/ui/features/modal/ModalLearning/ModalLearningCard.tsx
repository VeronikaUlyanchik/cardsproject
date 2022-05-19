import React, {FC, useEffect, useState} from 'react';
import {Modal} from "../Modal";
import Button from "@mui/material/Button";
import {BtnsBlock, Text, Title} from "../Modal.style";
import {ModalLearningAnswer} from "./ModalLearningAnswer";
import {CardType} from "../../../../api/CardsAPI";
import {useAppDispatch, useAppSelector} from "../../../../hooks/ReduxHooks";
import {selectCards} from "../../../../selectors/CardsSelectors";
import {getCardsTC} from "../../../../bll-redux/reducers/CardsReducer";

type ModalLearningCardContainerPropsType = {
    packName: string
    packId: string
    cards?: CardType[]
    openModalHandler: (value: boolean) => void
}
const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

export const ModalLearningCard: FC<ModalLearningCardContainerPropsType> =
    ({packName, openModalHandler, packId}) => {

        const dispatch = useAppDispatch();
        const cards = useAppSelector(state => selectCards(state, packId));
        const [first, setFirst] = useState<boolean>(true);
        const [isModal, setIsModal] = useState<boolean>(true);
        const [card, setCard] = useState<CardType>({
            answer: '',
            question: '',
            cardsPack_id: '',
            grade: 0,
            shots: 0,
            user_id: '',
            created: '',
            updated: '',
            _id: '',
        });

        const closeModal = () => {
            setIsModal(false)
            openModalHandler(false)
        }

        useEffect(() => {
            if (first) {
                dispatch(getCardsTC({cardsPack_id : packId}))
                setFirst(false)
            }
            setCard(getCard(cards))
        }, [cards, dispatch, first, packId])

        const nextHandler = () => {
            setCard(getCard(cards))
        }
        return (
            <>
                <Modal
                    isModal={isModal}
                >
                    <Title>Learn “{packName}”</Title>
                    <Text><b>Question:</b> "{card?.question}"</Text>
                    <BtnsBlock>
                        <Button color={"primary"} variant="outlined" size={"medium"}
                                onClick={closeModal}>Cancel</Button>
                        <ModalLearningAnswer packName={packName} question={card?.question} answer={card?.answer}
                                             opacity={0} nextHandler={nextHandler}/>
                    </BtnsBlock>
                </Modal>
            </>
        );
    };