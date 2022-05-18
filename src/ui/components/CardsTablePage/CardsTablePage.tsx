import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import {useNavigate, useSearchParams} from "react-router-dom";
import {CardsTable} from "../../features/TableCards/CardsTable";
import {createCard, getCardsTC} from "../../../bll-redux/reducers/CardsReducer";
import {ContentWrapper} from '../../../common/global-styles/CommonStyles.style';
import {StyledPaginationBox, StyledSearchForm} from "./CardsTablePage.style";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import {PaginationComponent} from "../../features/Pagination/Pagination";
import {SelectPageCount} from "../../features/SelectPageCount/SelectPageCount";
import {PATH} from "../../../enum/Path";
import {selectPackPerPage, selectTotalCountCards} from "../../../selectors/CardsSelectors";
import {ModalAddCard} from "../../features/modal/ModalCards/ModalAddCard";


export const CardsTablePage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [searchParams, setSearchParams] = useSearchParams()
    const id = searchParams.get('cardsPack_id')
    const totalCountCards = useAppSelector(selectTotalCountCards)
    const packPerPage = useAppSelector(selectPackPerPage)
    const totalPage = Math.ceil(totalCountCards / packPerPage)

    useEffect(() => {
        if (id) {
            dispatch(getCardsTC(id))
        }
    }, [dispatch, id])

    const goBackToPacks = () => {
        return navigate(`${PATH.PACKS}`)
    }

    const paginateCards = (page: number) => {
        id && dispatch(getCardsTC(id, page))
    }

    const changeItemPerPage = (pageCount: number) => {
        id && dispatch(getCardsTC(id, 1, pageCount))
    }

    const addCardHandler = (question: string) => {
        if (id) {
            dispatch(createCard(id, question))
        }
    }

    return (
        <ContentWrapper width={"65%"} height={"85%"} flex={"flex"} direction={"column"}>

            <StyledSearchForm>
                    <span style={{padding: "10px", display: "inline-flex", alignItems: "center"}}>
                        <ArrowCircleLeftIcon fontSize={"large"} onClick={goBackToPacks} style={{cursor: "pointer"}}/>
                        <h2 style={{marginLeft: "20px"}}>Pack Name</h2>
                    </span>
                <input type="text"/>
                <input type="text"/>
                <ModalAddCard addCard={addCardHandler}/>
            </StyledSearchForm>

            <CardsTable id={id ? id : ''}/>

            <StyledPaginationBox>
                <div> Show <SelectPageCount onChangeHandler={changeItemPerPage}/> packs per page</div>
                <PaginationComponent onClickHandler={paginateCards} totalPage={totalPage}/>
            </StyledPaginationBox>

        </ContentWrapper>
    );
};
