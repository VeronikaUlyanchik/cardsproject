import React, {FC, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../hooks/ReduxHooks";
import {
    selectCardsCount, selectCreatedTime,
    selectUserPackName,
    selectUpdatedTime,
    selectUserPackId
} from "../../../../selectors/PackSelectors";
import {selectUserId} from "../../../../selectors/UserSelectors";
import {CardItem, CardLine} from "../PacksTable.style";
import {deleteCardsPack, updateCardsPack} from "../../../../bll-redux/reducers/CardsPackReducer";
import {useNavigate} from "react-router-dom";
import ButtonGroup from '@mui/material/ButtonGroup';
import {PATH} from "../../../../enum/Path";
import {ModalLearningCard} from "../../modal/ModalLearning/ModalLearningCard";
import {ModalDeleteCard} from "../../modal/ModalCards/ModalDeleteCard";
import {ModalEditPack} from "../../modal/ModalPacks/ModalEditPack";
import {ModalDeletePack} from "../../modal/ModalPacks/ModalDeletePack";
import Button from "@mui/material/Button";


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
    const [openModal, setOpenModal] = useState<boolean>(false)

    const updatedDate = new Date(updated).toLocaleDateString()
    const createdDate = new Date(created).toLocaleDateString()

    const isMyCards = userId === userPackId

    const deletePack = () => {
        dispatch(deleteCardsPack(packId))
    }
    const updatePack = (title: string) => {
        dispatch(updateCardsPack(packId, title))
    }
    const showCards = () => {
        navigate(`${PATH.CARDS}?cardsPack_id=${packId}`)
    }
    const openModalHandler = (value: boolean) => {
        setOpenModal(value)
    }

    return <CardLine bgColor={index % 2 !== 0 ? '#0760b869' : '#77b2ebb0'}>
        <CardItem onClick={showCards} style={{cursor: "pointer"}}>{packName}</CardItem>
        <CardItem width={'10%'}>{cardsCount}</CardItem>
        <CardItem>{updatedDate}</CardItem>
        <CardItem>{createdDate}</CardItem>
        <CardItem width={'30%'}>
            {
                isMyCards
                    ? <ButtonGroup color={"primary"} size="small" variant="contained" aria-label="small button group">
                        <ModalDeletePack deletePack={deletePack} packName={packName}/>
                        <ModalEditPack packName={packName} updatePack={updatePack}/>
                        <Button color={"primary"} variant="contained" size={"small"} disabled={cardsCount === 0}
                                onClick={() => openModalHandler(true)}>Learn</Button>
                        {openModal && <ModalLearningCard
                            openModalHandler={openModalHandler}
                            packId={packId}
                            packName={packName}
                        />}
                    </ButtonGroup>
                    : <>
                        <Button color={"primary"} variant="contained" size={"small"} disabled={cardsCount === 0}
                                onClick={() => openModalHandler(true)}>Learn</Button>
                        {openModal && <ModalLearningCard
                            openModalHandler={openModalHandler}
                            packId={packId}
                            packName={packName}
                        />}
                    </>
            }
        </CardItem>
    </CardLine>
}