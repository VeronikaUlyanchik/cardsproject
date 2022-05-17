import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import {Navigate} from "react-router-dom";
import {createCardsPack, getPackList} from "../../../bll-redux/reducers/CardsPackReducer";
import {PacksTable} from "../../features/TablePacks/PacksTable";
import {ContentWrapper} from "../../../common/global-styles/CommonStyles.style";
import Button from "@mui/material/Button"
import ButtonGroup from '@mui/material/ButtonGroup';
import {selectUserId} from "../../../selectors/UserSelectors";
import {
    StyledButtons,
    StyledCardPacksBlock,
    StyledPaginationBlock,
    StyledRange, StyledSearchBlock,
    StyledSettings, StyledTitle
} from "./CardsPacksTablePage.style";
import {PaginationComponent} from "../../features/Pagination/Pagination";
import {SelectPageCount} from "../../features/SelectPageCount/SelectPageCount";
import {Range} from "../../features/Range/Range";
import {SearchComponent} from "../../features/SearchComponent/TextField";
import {PATH} from "../../../enum/Path";
import {selectIsLoggedIn} from "../../../selectors/AuthSelectors";
import {
    selectAllCardPacks,
    selectMyCardPacks,
    selectPackPerPage,
    selectTotalCountPacks, selectPackName, selectCurrentPage
} from "../../../selectors/PackSelectors";
import {ModalAddPack} from "../../features/modal/ModalPacks/ModalAddPack";
import {ModalSuccess} from "../../features/modal/ModalErrorAndSuccess/ModalSuccess";
import {selectStatus} from "../../../selectors/AppSelectors";
import {ModalError} from "../../features/modal/ModalErrorAndSuccess/ModalError";

export const CardsPacksTablePage = () => {
    const [isMyPacks, setIsMyPacks] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const userId = useAppSelector(selectUserId)
    const allCardPacks = useAppSelector(selectAllCardPacks)
    const myCardPacks = useAppSelector(state => selectMyCardPacks(state, userId))
    const totalCountPacks = useAppSelector(selectTotalCountPacks)
    const packPerPage = useAppSelector(selectPackPerPage)
    const packName = useAppSelector(selectPackName)
    const currentPage = useAppSelector(selectCurrentPage)

    const totalPage = Math.ceil(totalCountPacks / packPerPage)

    useEffect(() => {
        dispatch(getPackList({}))
    }, [])

    const setMyPacks = () => {
        setIsMyPacks(true)
        dispatch(getPackList({user_id: userId, pageCount: packPerPage}))
    }
    const setAllPacks = () => {
        setIsMyPacks(false)
        dispatch(getPackList({pageCount: packPerPage, packName}))
    }
    const paginatePacks = (page: number) => {
        isMyPacks
            ? dispatch(getPackList({user_id: userId, page, pageCount: packPerPage, packName}))
            : dispatch(getPackList({page, pageCount: packPerPage, packName}))
    }
    const changeItemPerPage = (pageCount: number) => {
        isMyPacks
            ? dispatch(getPackList({user_id: userId, page: 1, pageCount, packName}))
            : dispatch(getPackList({page: 1, pageCount, packName}))
    }
    const searchItemByName = (packName: string) => {
        isMyPacks
            ? dispatch(getPackList({user_id: userId, page: 1, packName, pageCount: packPerPage}))
            : dispatch(getPackList({page: 1, packName, pageCount: packPerPage}))
    }
    const searchWithMinMax = ([min, max]: number[]) => {
        isMyPacks
            ? dispatch(getPackList({user_id: userId, page: 1, packName, pageCount: packPerPage, min: min, max: max}))
            : dispatch(getPackList({page: 1, packName, pageCount: packPerPage, min: min, max: max}))
    }
    const addCardsPack = (title: string) => {
        dispatch(createCardsPack(title))
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <>
            <ModalSuccess/>
            <ModalError/>
            <ContentWrapper flex={"flex"} direction={"row"} width={"65%"} height={"85%"}>
                <StyledSettings>
                    <StyledButtons>
                        <h3>Show packs cards</h3>
                        <ButtonGroup aria-label="outlined button group">
                            <Button onClick={setMyPacks} variant={isMyPacks ? "contained" : "outlined"}>
                                My Packs
                            </Button>
                            <Button onClick={setAllPacks} variant={isMyPacks ? "outlined" : "contained"}>
                                All Packs
                            </Button>
                        </ButtonGroup>
                    </StyledButtons>

                    <StyledRange>
                        <Range searchWithMinMax={searchWithMinMax}/>
                    </StyledRange>
                </StyledSettings>

                <StyledCardPacksBlock>
                    <StyledTitle>Packs list</StyledTitle>
                    <StyledSearchBlock>
                        <SearchComponent onClickHandler={searchItemByName}/>
                        <ModalAddPack addPack={addCardsPack}/>
                    </StyledSearchBlock>

                    <PacksTable cardPacks={isMyPacks ? myCardPacks : allCardPacks}/>

                    <StyledPaginationBlock>
                        <div> Show <SelectPageCount onChangeHandler={changeItemPerPage}
                                                    packPerPage={packPerPage}/> packs
                            per page
                        </div>
                        <PaginationComponent onClickHandler={paginatePacks} totalPage={totalPage}
                                             currentPage={currentPage}/>
                    </StyledPaginationBlock>

                </StyledCardPacksBlock>
            </ContentWrapper>
        </>
    );
};