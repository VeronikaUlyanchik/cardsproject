import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import {useNavigate, useSearchParams} from "react-router-dom";
import {CardsTable} from "../../features/TableCards/CardsTable";
import {
    changeCardAnswer,
    changeCardQuestion,
    changePageCount,
    createCard,
    getCardsTC
} from "../../../bll-redux/reducers/CardsReducer";
import {ContentWrapper} from '../../../common/global-styles/CommonStyles.style';
import {StyledPaginationBox, StyledSearchForm} from "./CardsTablePage.style";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import {PaginationComponent} from "../../features/Pagination/Pagination";
import {SelectPageCount} from "../../features/SelectPageCount/SelectPageCount";
import {PATH} from "../../../enum/Path";
import {
    selectCardsAnswer, selectCardsPageCount,
    selectCardsQuestion,
    selectPackPerPage,
    selectTotalCountCards
} from "../../../selectors/CardsSelectors";
import {ModalAddCard} from "../../features/modal/ModalCards/ModalAddCard";
import {ModalSuccess} from "../../features/modal/ModalErrorAndSuccess/ModalSuccess";
import {ModalError} from "../../features/modal/ModalErrorAndSuccess/ModalError";
import {SearchComponent} from "../../features/SearchComponent/TextField";


export const CardsTablePage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [searchParams, setSearchParams] = useSearchParams()
    const id = searchParams.get('cardsPack_id')
    const page = searchParams.get('page')
    const totalCountCards = useAppSelector(selectTotalCountCards)
    const packPerPage = useAppSelector(selectPackPerPage)
    const cardAnswer = useAppSelector(selectCardsAnswer)
    const cardQuestion = useAppSelector(selectCardsQuestion)
    const pageCount = useAppSelector(selectCardsPageCount)
    const totalPage = Math.ceil(totalCountCards / packPerPage)


    useEffect(() => {
        if (id && page) {
            dispatch(getCardsTC({cardsPack_id: id, page: +page, cardQuestion, cardAnswer, pageCount}))
        }
    }, [cardAnswer, cardQuestion, dispatch, id, page, pageCount])

    const goBackToPacks = () => {
        return navigate(`${PATH.PACKS}`)
    }

    const paginateCards = (page: number) => {
        if (id) {
            setSearchParams({cardsPack_id: id.toString(), page: page.toString()});
        } else {
            setSearchParams({});
        }
    }

    const changeItemPerPage = (pageCount: number) => {
        id && dispatch(changePageCount(pageCount))
    }

    const addCardHandler = (question: string) => {
        if (id) {
            dispatch(createCard({cardsPack_id: id, question}))
        }
    }
    const searchItemByQuestion = (value: string) => {
        dispatch(changeCardQuestion(value))
    }
    const searchItemByAnswer = (value: string) => {
        dispatch(changeCardAnswer(value))
    }

    return (
        <>
            <ModalSuccess/>
            <ModalError/>
            <ContentWrapper width={"65%"} height={"85%"} flex={"flex"} direction={"column"}>

                <StyledSearchForm>
                    <span style={{padding: "10px", display: "inline-flex", alignItems: "center"}}>
                        <ArrowCircleLeftIcon fontSize={"large"} onClick={goBackToPacks} style={{cursor: "pointer"}}/>
                        <h2 style={{marginLeft: "20px"}}>Pack Name</h2>
                    </span>
                    <div style={{display: "flex"}}>
                        <SearchComponent label="Search by question" onClickHandler={searchItemByQuestion}/>
                        <SearchComponent label="Search by answer" onClickHandler={searchItemByAnswer}/>
                    </div>

                    <ModalAddCard addCard={addCardHandler}/>
                </StyledSearchForm>

                <CardsTable id={id ? id : ''}/>

                <StyledPaginationBox>
                    <div> Show <SelectPageCount onChangeHandler={changeItemPerPage}/> packs per page</div>
                    <PaginationComponent currentPage={page ? +page : 1} onClickHandler={paginateCards}
                                         totalPage={totalPage}/>
                </StyledPaginationBox>

            </ContentWrapper>
        </>
    );
};
