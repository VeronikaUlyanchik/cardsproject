import {createAsyncThunk, createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {cardsAPI, CardType, GetCardsResponseType} from "../../api/CardsAPI";
import {setAppStatus, setIsError, setIsSuccessful} from "./AppReducer";
import {modalGradeAPI, UpdatedGradeType} from "../../api/ModalGradeAPI";


const slice = createSlice({
        name: "cards",
        initialState: {
            cards: [] as CardType[],
            totalCountCards: 0,
            packPerPage: 0,
            cardAnswer: '',
            cardQuestion: '',
            cardsPack_id: '',
            //sortCards,
            page: 1,
            pageCount: 10,

        },
        reducers: {
            setCards(state, action: PayloadAction<CardType[]>) {
                state.cards = action.payload;
            },
            setCardsInformation(state, action: PayloadAction<GetCardsResponseType>) {
                state.totalCountCards = action.payload.cardsTotalCount;
                state.packPerPage = action.payload.pageCount;
            },
            changeCardQuestion(state, action: PayloadAction<string>) {
                state.cardQuestion = action.payload;
                state.page = 1;
            },
            changeCardAnswer(state, action: PayloadAction<string>) {
                state.cardAnswer = action.payload;
                state.page = 1;
            },
            changePageCount(state, action: PayloadAction<number>) {
                state.pageCount = action.payload;
                state.page = 1;
            },
            updateCardsGrade(state, action: PayloadAction<UpdatedGradeType>) {
                state.cards = state.cards.map(m => m._id === action.payload.card_id ? {
                    ...m,
                    grade: action.payload.grade
                } : m)
            }
        }
    }
)

export const getCardsTC = createAsyncThunk(
    'cards/getCardsTC',
    async (data: { cardsPack_id: string, page?: number, pageCount?: number, cardAnswer?: string, cardQuestion?: string },
           {dispatch}) => {
        const {cardsPack_id, page, pageCount, cardAnswer, cardQuestion} = data
        dispatch(setAppStatus({status: 'loading'}))
        try {
            const response = await cardsAPI.getCards({cardsPack_id, page, pageCount, cardAnswer, cardQuestion})
            dispatch(setCards(response.data.cards))
            dispatch(setCardsInformation(response.data))
        } catch (err: any) {
            console.warn(err)
            dispatch(setIsError(true))
        } finally {
            dispatch(setAppStatus({status: 'idle'}))
        }
    })

export const createCard = createAsyncThunk(
    'cards/createCard',
    async (data: { cardsPack_id: string, question?: string, answer?: string, grade?: number },
           {dispatch}) => {
        const {cardsPack_id, question, answer, grade} = data
        dispatch(setAppStatus({status: 'loading'}))
        try {
            const response = await cardsAPI.createCard(cardsPack_id, question, answer, grade)
            await dispatch(getCardsTC({cardsPack_id}))
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(setIsSuccessful(true))
            return response
        } catch (error) {
            console.warn(error)
            dispatch(setIsError(true))
        } finally {
            dispatch(setAppStatus({status: 'idle'}))
        }
    })

export const deleteCardTC = createAsyncThunk(
    'cards/deleteCardTC',
    async (data: { cardsPack_id: string, id: string }, {dispatch}) => {
        const {cardsPack_id, id} = data
        dispatch(setAppStatus({status: 'loading'}))
        try {
            const response = await cardsAPI.deleteCard(id)
            await dispatch(getCardsTC({cardsPack_id}))
            dispatch(setIsSuccessful(true))
            return response
        } catch (err: any) {
            console.warn(err)
            dispatch(setIsError(true))
        } finally {
            dispatch(setAppStatus({status: 'idle'}))
        }
    })

export const updateCardTC = createAsyncThunk(
    'cards/updateCardTC',
    async (data: { cardsPack_id: string, cardId: string, question: string, answer: string },
           {dispatch}) => {
        const {cardsPack_id, cardId, question, answer} = data
        dispatch(setAppStatus({status: 'loading'}))

        try {
            const response = await cardsAPI.updateCard({_id: cardId, question, answer})
            await dispatch(getCardsTC({cardsPack_id}))
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(setIsSuccessful(true))
            return response
        } catch (err: any) {
            console.warn(err)
            dispatch(setIsError(true))
        } finally {
            dispatch(setAppStatus({status: 'idle'}))
        }
    }
)

export const updateModalGrade = (grade: number, card_id: string) => async (dispatch: Dispatch) => {

    try {
        dispatch(setAppStatus({status: 'loading'}))
        const res = await modalGradeAPI.updateGrade({grade, card_id})
        dispatch(updateCardsGrade(res.data))
    } catch (err: any) {
        console.log(err)
    } finally {
        dispatch(setAppStatus({status: 'succeeded'}))
    }

}

export const {
    setCards,
    setCardsInformation,
    changeCardQuestion,
    changeCardAnswer,
    changePageCount,
    updateCardsGrade
} = slice.actions
export const cardsReducer = slice.reducer

export type CardsReducerActionsType = ReturnType<typeof setCards>
