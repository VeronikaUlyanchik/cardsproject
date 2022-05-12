import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../hooks/ReduxHooks";
import {CardLine, CardLineItem} from "../CardsTable.style";
import {
    selectCardAnswer,
    selectCardGrade,
    selectCardQuestion,
    selectCardUpdatedTime
} from "../../../../selectors/CardsSelectors";


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

    const updatedTime = new Date(updated).toLocaleDateString()
    const starsGrade = Math.ceil(grade)


    const deleteCard = () => {}

    return <CardLine bgColor={ index%2 !== 0 ? '#0760b869' : '#77b2ebb0' }>
        <CardLineItem width={'30%'}>{question}</CardLineItem>
        <CardLineItem width={'30%'}>{answer}</CardLineItem>
        <CardLineItem>{updatedTime}</CardLineItem>
        <CardLineItem>{starsGrade}</CardLineItem>
           </CardLine>
}