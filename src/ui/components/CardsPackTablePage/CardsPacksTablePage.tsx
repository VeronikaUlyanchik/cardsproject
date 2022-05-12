import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import {createCardsPack, getPackList} from "../../../bll-redux/reducers/CardsPackReducer";
import {PacksTable} from "../../features/TablePacks/PacksTable";
import {ContentWrapper} from "../../../common/global-styles/CommonStyles.style";
import Button from "@mui/material/Button"
import ButtonGroup from '@mui/material/ButtonGroup';
import {selectUserId} from "../../../selectors/UserSelectors";
import {StyledButtons, StyledCardPacksBlock, StyledRange, StyledSettings} from "./CardsPacksTablePage.style";
import {PaginationComponent} from "../../features/Pagination/Pagination";
import {SelectPageCount} from "../../features/SelectPageCount/SelectPageCount";
import {Range} from "../../features/Range/Range";
import {SearchComponent} from "../../features/SearchComponent/TextField";

export const CardsPacksTablePage = () => {
    const [isMyPacks, setIsMyPacks] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    // const isAuth = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const userId = useAppSelector(selectUserId)
    const allCardPacks = useAppSelector(state => state.packList.packList)
    const myCardPacks = useAppSelector(state => state.packList.packList.filter(p => p.user_id === userId))
    const totalCountPacks = useAppSelector(state => state.packList.totalCountPacks)
    const packPerPage =  useAppSelector(state => state.packList.packPerPage)
    const packName =  useAppSelector(state => state.packList.packName)
    const currentPage =  useAppSelector(state => state.packList.page)
    const totalPage = Math.ceil(totalCountPacks/packPerPage)

    const setMyPacks = () => {
        setIsMyPacks(true)
        dispatch(getPackList({user_id: userId , pageCount:packPerPage}))
    }
    const setAllPacks = () => {
        setIsMyPacks(false)
        dispatch(getPackList({pageCount:packPerPage, packName }))
    }

    const paginatePacks = (page:number)=> {
        console.log(packName)
       isMyPacks
            ?dispatch(getPackList({user_id: userId, page, pageCount:packPerPage, packName  }))
            :dispatch(getPackList({page, pageCount:packPerPage, packName }))
    }
    const changeItemPerPage = (pageCount:number)=> {
      isMyPacks
            ?dispatch(getPackList({user_id: userId, page:1, pageCount, packName }))
            :dispatch(getPackList({page:1, pageCount, packName }))
    }
    const searchItemByName = (packName:string)=> {
        isMyPacks
            ?dispatch(getPackList({user_id: userId, page:1, packName , pageCount:packPerPage }))
            :dispatch(getPackList({page:1, packName , pageCount:packPerPage}))
    }

    const searchWithMinMax = ([min,max]:number[]) => {
        isMyPacks
            ?dispatch(getPackList({user_id: userId, page:1, packName , pageCount:packPerPage, min: min, max:max }))
            :dispatch(getPackList({page:1, packName , pageCount:packPerPage, min: min, max:max}))
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
                    <Range searchWithMinMax={searchWithMinMax}/>
                </StyledRange>
            </StyledSettings>
            <StyledCardPacksBlock>
                <SearchComponent onClickHandler={searchItemByName}/>
                <h1 style={{height: "25%"}}>Packs list</h1>
                <PacksTable cardPacks={isMyPacks ? myCardPacks : allCardPacks}/>
                <div className='paginationBox' style={{height: "5%"}}>
                   <div> Show <SelectPageCount onChangeHandler ={changeItemPerPage} packPerPage={packPerPage}/> packs per page</div>
                    <PaginationComponent onClickHandler={paginatePacks} totalPage={totalPage} currentPage={currentPage}/>
                </div>
            </StyledCardPacksBlock>

        </ContentWrapper>
    );
};