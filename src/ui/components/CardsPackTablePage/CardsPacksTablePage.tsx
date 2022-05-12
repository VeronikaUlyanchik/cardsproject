import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import {NavLink, useNavigate} from "react-router-dom";
import {PATH} from "../../../App";
import SuperButton from "../../features/SuperButton/SuperButton";
import {createCardsPack, getPackList} from "../../../bll-redux/reducers/CardsPackReducer";
import SuperInputText from "../../features/SuperInputText/SuperInputText";
import {PacksTable} from "../../features/TablePacks/PacksTable";
import {ContentWrapper} from "../../../common/global-styles/CommonStyles.style";
import Button from "@mui/material/Button"
import ButtonGroup from '@mui/material/ButtonGroup';
import {selectUserId} from "../../../selectors/UserSelectors";
import {StyledButtons, StyledCardPacksBlock, StyledRange, StyledSettings} from "./CardsPacksTablePage.style";

export const CardsPacksTablePage = () => {
    const [isMyPacks, setIsMyPacks] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    // const isAuth = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const userId = useAppSelector(selectUserId)
    const allCardPacks = useAppSelector(state => state.packList.packList)
    const myCardPacks = useAppSelector(state => state.packList.packList.filter(p => p.user_id === userId))

    const setMyPacks = () => {
        setIsMyPacks(true)
        dispatch(getPackList({user_id: userId}))
    }
    const setAllPacks = () => {
        setIsMyPacks(false)
        dispatch(getPackList({}))
    }

    // if (!isAuth) {
    //     return <NavLink to={PATH.LOGIN}/>
    // }

    return (
            <ContentWrapper flex={"flex"} width={"1000px"} height={"750px"}>
                <StyledSettings>
                    <StyledButtons>
                        <h3>Show packs cards</h3>
                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                            <Button onClick={setMyPacks}>
                                My Packs
                            </Button>
                            <Button onClick={setAllPacks}>
                                All Packs
                            </Button>
                        </ButtonGroup>
                    </StyledButtons>
                    <StyledRange>
                        <h3>Number of cards</h3>
                    </StyledRange>
                </StyledSettings>
                <StyledCardPacksBlock>
                    <h1 style={{height: "20%"}}>Packs list</h1>
                    <PacksTable cardPacks={isMyPacks ? myCardPacks : allCardPacks}/>
                    <h1 style={{height: "10%"}}>Pagination</h1>
                </StyledCardPacksBlock>

            </ContentWrapper>
    );
};