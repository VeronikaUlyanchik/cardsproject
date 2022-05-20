import React, {FC, useEffect, useState} from 'react';
import {Modal} from "../Modal";
import Button from "@mui/material/Button";
import {BtnsBlock, Text, Title} from "../Modal.style";
import {ModalLearningAnswer} from "./ModalLearningAnswer";
import {CardType} from "../../../../api/CardsAPI";
import {useAppDispatch, useAppSelector} from "../../../../hooks/ReduxHooks";
import {selectCards} from "../../../../selectors/CardsSelectors";
import {getCardsTC} from "../../../../bll-redux/reducers/CardsReducer";
import {getCard} from "../../../../utils/GetCardRandom";


type ModalLearningCardContainerPropsType = {
    packName: string
    packId: string
    cards?: CardType[]
    openModalHandler: (value: boolean) => void
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
                dispatch(getCardsTC({cardsPack_id: packId}))
                setFirst(false)
            }
            setCard(getCard(cards))
        }, [cards, dispatch, first, packId])

        const nextHandler = () => {
            setCard(getCard(cards))
        }

        return (
            <>
                <Modal isModal={isModal}>
                    <Title>Learn “{packName}”</Title>
                    <Text>
                        <b>Question:</b> "{card?.question}"
                    </Text>
                    <BtnsBlock>
                        <Button
                            color={"primary"}
                            variant="outlined"
                            size={"medium"}
                            onClick={closeModal}>
                            Cancel
                        </Button>
                        <ModalLearningAnswer
                            packName={packName}
                            question={card?.question}
                            answer={card?.answer}
                            opacity={0}
                            nextHandler={nextHandler}
                            card_id={card?._id}
                        />
                    </BtnsBlock>
                </Modal>
            </>
        );
    };