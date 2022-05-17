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
import {ModalSuccess} from "../../features/modal/ModalErrorAndSuccess/ModalSuccess";
import {ModalError} from "../../features/modal/ModalErrorAndSuccess/ModalError";


export const CardsTablePage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [searchParams, setSearchParams] = useSearchParams()
    const id = searchParams.get('cardsPack_id')
    const page = searchParams.get('page')
    const totalCountCards = useAppSelector(selectTotalCountCards)
    const packPerPage = useAppSelector(selectPackPerPage)
    const totalPage = Math.ceil(totalCountCards / packPerPage)


    useEffect(() => {
        if (id && page) {
            dispatch(getCardsTC({cardsPack_id: id, page: +page}))
        }
    }, [dispatch, id, page])

    const goBackToPacks = () => {
        return navigate(`${PATH.PACKS}`)
    }

    const paginateCards = (page: number) => {
        // id && dispatch(getCardsTC({cardsPack_id: id, page}))
        if (id) {
            setSearchParams({ cardsPack_id: id.toString(), page: page.toString() });
            dispatch(getCardsTC({cardsPack_id: id, page: page}))
        } else {
            setSearchParams({});
        }
    }

    const changeItemPerPage = (pageCount: number) => {
        id && dispatch(getCardsTC({cardsPack_id: id, page: 1, pageCount}))
    }

    const addCardHandler = (question: string) => {
        if (id) {
            dispatch(createCard({cardsPack_id: id, question}))
        }
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
                    <input type="text"/>
                    <input type="text"/>
                    <ModalAddCard addCard={addCardHandler}/>
                </StyledSearchForm>

                <CardsTable id={id ? id : ''}/>

                <StyledPaginationBox>
                    <div> Show <SelectPageCount onChangeHandler={changeItemPerPage}/> packs per page</div>
                    <PaginationComponent currentPage={page ? +page: 1} onClickHandler={paginateCards} totalPage={totalPage}/>
                </StyledPaginationBox>

            </ContentWrapper>
        </>
    );
};
