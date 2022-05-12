import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import {useNavigate, useSearchParams} from "react-router-dom";
import {CardsTable} from "../../features/TableCards/CardsTable";
import {getCardsTC} from "../../../bll-redux/reducers/CardsReducer";
import {ContentWrapper} from '../../../common/global-styles/CommonStyles.style';
import {StyledPaginationBox, StyledSearchForm} from "./CardsTablePage.style";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import {PATH} from "../../../App";
import {PaginationComponent} from "../../features/Pagination/Pagination";
import {SelectPageCount} from "../../features/SelectPageCount/SelectPageCount";


export const CardsTablePage = () => {

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const [searchParams, setSearchParams] = useSearchParams()
    const id = searchParams.get('cardsPack_id')
    const totalCountCards = useAppSelector(state => state.cards.totalCountCards)
    const packPerPage =  useAppSelector(state => state.cards.packPerPage)
    const totalPage = Math.ceil(totalCountCards/packPerPage)

    useEffect(() => {
        if (id) {
            dispatch(getCardsTC(id))
        }

    }, [dispatch, id])

    const goBackToPacks = () => {
        return navigate(`${PATH.PACKS}`)
    }

    const paginateCards = (page:number) => {
        id && dispatch(getCardsTC(id, page ))
    }

    const changeItemPerPage = (pageCount:number) => {
        id && dispatch(getCardsTC(id, 1,pageCount ))
    }

    return (
        <div>
            <ContentWrapper width={"1000px"} height={"750px"}>
                <StyledSearchForm>
                    <span style={{padding: "10px", display: "inline-flex", alignItems: "center"}}>
                        {/*<StyledIcon>*/}
                            <ArrowCircleLeftIcon fontSize={"large"} onClick={goBackToPacks} style={{cursor: "pointer"}}/>
                        {/*</StyledIcon>*/}
                        <h1 style={{marginLeft: "20px"}}>Pack Name</h1>
                    </span>
                    <input type="text"/>
                    <input type="text"/>
                </StyledSearchForm>
                <div style={{maxHeight: "75%"}}>
                    <CardsTable id={id ? id : ''}/>
                </div>
                <StyledPaginationBox>
                    <div> Show <SelectPageCount onChangeHandler ={changeItemPerPage}/> packs per page</div>
                    <PaginationComponent onClickHandler={paginateCards} totalPage={totalPage}/>
                </StyledPaginationBox>
            </ContentWrapper>
        </div>
    );
};
