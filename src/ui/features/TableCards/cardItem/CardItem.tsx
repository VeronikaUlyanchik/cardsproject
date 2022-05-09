import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../hooks/ReduxHooks";
import {CardItem, CardLine} from "../CardsTable.style";
import {
    selectCardAnswer,
    selectCardGrade,
    selectCardQuestion,
    selectCardUpdatedTime
} from "../../../../selectors/CardsSelectors";


type CardItemPropsType = {
    cardId: string
}
export const CardTableItem: FC<CardItemPropsType> = ({cardId}) => {
    const dispatch = useAppDispatch()

    const question = useAppSelector(state => selectCardQuestion(state, cardId))
    const answer = useAppSelector(state => selectCardAnswer(state, cardId))
    const updated = useAppSelector(state => selectCardUpdatedTime(state, cardId))
    const grade = useAppSelector(state => selectCardGrade(state, cardId))

    const updatedTime = new Date(updated).toLocaleDateString()
    const starsGrade = Math.ceil(grade)


    const deleteCard = () => {}

    return <CardLine>
        <CardItem width={'30%'}>{question}</CardItem>
        <CardItem width={'30%'}>{answer}</CardItem>
        <CardItem>{updatedTime}</CardItem>
        <CardItem>{starsGrade}</CardItem>
           </CardLine>
}