import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import {useNavigate, useSearchParams} from "react-router-dom";
import {CardsTable} from "../../features/TableCards/CardsTable";
import {
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
    selectCardsPageCount,
    selectPackPerPage,
    selectTotalCountCards
} from "../../../selectors/CardsSelectors";
import {ModalAddCard} from "../../features/modal/ModalCards/ModalAddCard";
import {ModalSuccess} from "../../features/modal/ModalErrorAndSuccess/ModalSuccess";
import {ModalError} from "../../features/modal/ModalErrorAndSuccess/ModalError";
import {SearchComponent} from "../../features/SearchComponent/TextField";
import {selectUserPackName} from "../../../selectors/PackSelectors";


export const CardsTablePage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [searchParams, setSearchParams] = useSearchParams()
    const id = searchParams.get('cardsPack_id')
    const page = useAppSelector(state => state.cards.page)
    const totalCountCards = useAppSelector(selectTotalCountCards)
    const packPerPage = useAppSelector(selectPackPerPage)
    const pageCount = useAppSelector(selectCardsPageCount)
    const totalPage = Math.ceil(totalCountCards / packPerPage)
    const packName = useAppSelector(state => selectUserPackName(state, id ? id : ''))
    const [cardAnswer, setCardAnswer] = useState<string>('')
    const [cardQuestion, setCardQuestion] = useState<string>('')

    useEffect(() => {
        if (id && page) {
            dispatch(getCardsTC({cardsPack_id: id, page: page, cardQuestion, cardAnswer, pageCount}))
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
        id && dispatch(createCard({cardsPack_id: id, question}))
    }
    const searchItemByQuestion = (value: string) => {
        setCardQuestion(value)

    }
    const searchItemByAnswer = (value: string) => {
        setCardAnswer(value)
    }

    return (
        <>
            <ModalSuccess/>
            <ModalError/>

            <ContentWrapper width={"65%"} height={"85%"} flex={"flex"} direction={"column"}>
                <StyledSearchForm>
                    <span style={{padding: "10px", display: "inline-flex", alignItems: "center"}}>
                        <ArrowCircleLeftIcon
                            fontSize={"large"}
                            onClick={goBackToPacks}
                            style={{cursor: "pointer"}}
                        />
                        <h2 style={{marginLeft: "20px"}}>
                            {packName}
                        </h2>
                    </span>
                    <div style={{width: '100%', display: "flex", justifyContent: 'space-around'}}>
                        <SearchComponent
                            label="Search by question"
                            onClickHandler={searchItemByQuestion}
                        />
                        <SearchComponent
                            label="Search by answer"
                            onClickHandler={searchItemByAnswer}
                        />

                        <div style={{alignSelf: 'end'}}>
                            <ModalAddCard
                                addCard={addCardHandler}
                            />
                        </div>
                    </div>
                </StyledSearchForm>

                <CardsTable id={id ? id : ''}/>

                <StyledPaginationBox>
                    <div>
                        Show
                        <SelectPageCount
                            onChangeHandler={changeItemPerPage}
                        />
                        packs per page
                    </div>
                    <PaginationComponent
                        currentPage={page ? +page : 1}
                        onClickHandler={paginateCards}
                        totalPage={totalPage}
                    />
                </StyledPaginationBox>
            </ContentWrapper>
        </>
    );
};
