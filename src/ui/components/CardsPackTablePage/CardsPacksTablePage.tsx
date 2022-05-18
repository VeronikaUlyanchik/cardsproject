import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import {Navigate} from "react-router-dom";
import {
    changeMinMax,
    changePacksPerPage,
    changePage,
    createCardsPack,
    getPackList,
    searchPackName
} from "../../../bll-redux/reducers/CardsPackReducer";
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
    selectTotalCountPacks,
    selectPackName,
    selectCurrentPage,
    selectMinCards,
    selectMaxCards,
    selectMinSelectedCards,
    selectMaxSelectedCards
} from "../../../selectors/PackSelectors";
import {ModalAddPack} from "../../features/modal/ModalPacks/ModalAddPack";
import {ModalSuccess} from "../../features/modal/ModalErrorAndSuccess/ModalSuccess";

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
    const min = useAppSelector(selectMinCards)
    const max = useAppSelector(selectMaxCards)
    const minSelected = useAppSelector(selectMinSelectedCards)
    const maxSelected = useAppSelector(selectMaxSelectedCards)

    const totalPage = Math.ceil(totalCountPacks / packPerPage)

    useEffect(() => {
        dispatch(getPackList({}))
    }, [])

    useEffect(() => {
        isMyPacks
            ? dispatch(getPackList(
                {
                    user_id: userId,
                    page: currentPage,
                    packName,
                    pageCount: packPerPage,
                    min:minSelected > max ? min : minSelected,
                    max:maxSelected,
                }))
            : dispatch(getPackList(
                {
                    page: currentPage,
                    packName,
                    pageCount: packPerPage,
                    min:minSelected,
                    max:maxSelected,
                }))
    }, [dispatch, userId, packPerPage,minSelected, maxSelected, min, max, currentPage, isMyPacks, packName])

    const setMyPacks = () => {
        setIsMyPacks(true)
    }
    const setAllPacks = () => {
        setIsMyPacks(false)
    }

    const paginatePacks = (page: number) => {
        dispatch(changePage(page))
    }

    const changeItemPerPage = (pageCount: number) => {
        dispatch(changePacksPerPage(pageCount))
    }

    const searchItemByName = (packName: string) => {
        dispatch(searchPackName(packName))
    }

    const searchWithMinMax = ([min, max]: number[]) => {
        dispatch(changeMinMax([min,max]))
    }
    const addCardsPack = (title: string) => {
        dispatch(createCardsPack(title))
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
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