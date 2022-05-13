import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import {Navigate} from "react-router-dom";
import {getPackList} from "../../../bll-redux/reducers/CardsPackReducer";
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
    selectMyCardPacks, selectUserPackName,
    selectPackPerPage,
    selectTotalCountPacks, selectPackName, selectCurrentPage
} from "../../../selectors/PackSelectors";

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
        console.log(packName)
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
    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <ContentWrapper flex={"flex"} direction={"row"} width={"1000px"} height={"750px"}>
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
                    <Button variant={"contained"} color={"success"} onClick={() => alert("Add Card")}>
                        Add Cards
                    </Button>
                </StyledSearchBlock>

                <PacksTable cardPacks={isMyPacks ? myCardPacks : allCardPacks}/>

                <StyledPaginationBlock>
                    <div> Show <SelectPageCount onChangeHandler={changeItemPerPage} packPerPage={packPerPage}/> packs
                        per page
                    </div>
                    <PaginationComponent onClickHandler={paginatePacks} totalPage={totalPage}
                                         currentPage={currentPage}/>
                </StyledPaginationBlock>

            </StyledCardPacksBlock>
        </ContentWrapper>
    );
};