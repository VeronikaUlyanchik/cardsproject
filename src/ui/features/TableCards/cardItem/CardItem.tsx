import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../hooks/ReduxHooks";
import {CardLine, CardLineItem} from "../CardsTable.style";
import {
    selectCardAnswer,
    selectCardGrade, selectCardPackID,
    selectCardQuestion,
    selectCardUpdatedTime, selectCardUserId
} from "../../../../selectors/CardsSelectors";
import {selectUserId} from "../../../../selectors/UserSelectors";
import {ModalEditCard} from "../../modal/ModalCards/ModalEditCard";
import {deleteCardTC, updateCardTC} from "../../../../bll-redux/reducers/CardsReducer";
import {ModalDeleteCard} from "../../modal/ModalCards/ModalDeleteCard";


type CardItemPropsType = {
    cardId: string
    index: number
}
export const CardTableItem: FC<CardItemPropsType> = ({cardId, index}) => {
    const dispatch = useAppDispatch()

    const question = useAppSelector(state => selectCardQuestion(state, cardId))
    const answer = useAppSelector(state => selectCardAnswer(state, cardId))
    const updated = useAppSelector(state => selectCardUpdatedTime(state, cardId))
    const grade = useAppSelector(state => selectCardGrade(state, cardId))
    const cardUserId = useAppSelector(state => selectCardUserId(state, cardId))
    const userId = useAppSelector(selectUserId)
    const cardsPack_id = useAppSelector(state => selectCardPackID(state, cardId))

    const updatedTime = new Date(updated).toLocaleDateString()
    const starsGrade = Math.ceil(grade)


    const deleteCard = () => {
        dispatch(deleteCardTC({cardsPack_id, id: cardId}))
    }

    const updateCard = (question: string, answer: string) => {
        dispatch(updateCardTC({cardsPack_id, cardId, question, answer}))
    }

    return (
        <CardLine bgColor={index % 2 !== 0 ? '#0760b869' : '#77b2ebb0'}>
            <CardLineItem width={'30%'}>{question}</CardLineItem>
            <CardLineItem width={'30%'}>{answer}</CardLineItem>
            <CardLineItem>{updatedTime}</CardLineItem>
            <CardLineItem>{starsGrade}</CardLineItem>
            {
                cardUserId === userId &&
                <CardLineItem>
                    <ModalEditCard question={question} answer={answer} updateCard={updateCard}/>
                    <ModalDeleteCard deleteCard={deleteCard} />
                </CardLineItem>
            }
        </CardLine>
    )
}