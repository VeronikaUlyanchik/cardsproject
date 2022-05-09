import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../hooks/ReduxHooks";
import {
    selectCardsCount, selectCreatedTime,
    selectPackName,
    selectUpdatedTime,
    selectUserPackId
} from "../../../../selectors/PackSelectors";
import {selectUserId} from "../../../../selectors/UserSelectors";
import {CardItem, CardLine} from "../PacksTable.style";
import {deleteCardsPack} from "../../../../bll-redux/reducers/CardsPackReducer";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../../../App";
import {createCard} from "../../../../bll-redux/reducers/CardsReducer";

type PackItemPropsType = {
    packId: string
}
export const PackItem: FC<PackItemPropsType> = ({packId}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const packName = useAppSelector(state => selectPackName(state, packId))
    const userId = useAppSelector(selectUserId)
    const userPackId = useAppSelector(state => selectUserPackId(state, packId))
    const cardsCount = useAppSelector(state => selectCardsCount(state, packId))
    const updated = useAppSelector(state => selectUpdatedTime(state, packId))
    const created = useAppSelector(state => selectCreatedTime(state, packId))

    const updatedDate = new Date(updated).toLocaleDateString()
    const createdDate = new Date(created).toLocaleDateString()

    const isMyCards = userId === userPackId

    const deletePack = () => {
        dispatch(deleteCardsPack(packId))
    }
    const showCards = () => {
        navigate(`${PATH.CARDS}?cardsPack_id=${packId}`)
    }

    const addCard = () => {
        debugger
        dispatch(createCard(packId, 'Ololo'))
    }

    return <CardLine>
        <CardItem onClick={showCards}>{packName}</CardItem>
        <CardItem width={'10%'}>{cardsCount}</CardItem>
        <CardItem>{updatedDate}</CardItem>
        <CardItem>{createdDate}</CardItem>
        <CardItem width={'30%'}>
            {
                isMyCards
                    ? <span>
                            <button onClick={deletePack}>Delete</button>
                            <button>Edit</button>
                            <button>Learn</button>
                            <button onClick={addCard}>Add Card</button>
                        </span>
                    : <button>Learn</button>
            }
        </CardItem>
    </CardLine>
}