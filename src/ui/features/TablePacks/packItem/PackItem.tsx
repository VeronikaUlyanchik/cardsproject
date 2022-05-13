import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../hooks/ReduxHooks";
import {
    selectCardsCount, selectCreatedTime,
    selectUserPackName,
    selectUpdatedTime,
    selectUserPackId
} from "../../../../selectors/PackSelectors";
import {selectUserId} from "../../../../selectors/UserSelectors";
import {CardItem, CardLine} from "../PacksTable.style";
import {deleteCardsPack} from "../../../../bll-redux/reducers/CardsPackReducer";
import {useNavigate} from "react-router-dom";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import {PATH} from "../../../../enum/Path";


type PackItemPropsType = {
    packId: string
    index: number
}
export const PackItem: FC<PackItemPropsType> = ({packId, index}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const packName = useAppSelector(state => selectUserPackName(state, packId))
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

    return <CardLine bgColor={index%2 !== 0 ? '#0760b869' : '#77b2ebb0'}>
        <CardItem onClick={showCards} style={{cursor: "pointer"}}>{packName}</CardItem>
        <CardItem width={'10%'}>{cardsCount}</CardItem>
        <CardItem>{updatedDate}</CardItem>
        <CardItem>{createdDate}</CardItem>
        <CardItem width={'30%'}>
            {
                isMyCards
                    ? <ButtonGroup color={"primary"}  size="small"  variant="contained" aria-label="small button group">
                            <Button onClick={deletePack}>Delete</Button>
                            <Button>Edit</Button>
                            <Button>Learn</Button>
                            {/*<button onClick={addCard}>Add Card</button>*/}
                    </ButtonGroup>
                    : <Button color={"primary"} variant="contained" size={"small"}>Learn</Button>
            }
        </CardItem>
    </CardLine>
}