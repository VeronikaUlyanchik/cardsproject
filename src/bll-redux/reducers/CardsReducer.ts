import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {cardsAPI, CardType, GetCardsResponseType} from "../../api/Api";
import {AppThunk} from "../store";


const slice = createSlice({
        name: "cards",
        initialState: {
            cards: [] as CardType[],
            totalCountCards: 0,
            packPerPage: 0,
        },
        reducers: {
            setCards(state, action: PayloadAction<CardType[]>) {
                state.cards = action.payload;
            },
            setCardsInformation(state, action: PayloadAction<GetCardsResponseType>) {
                state.totalCountCards = action.payload.cardsTotalCount;
                state.packPerPage = action.payload.pageCount;
            },
        }
    }
)

export const getCardsTC = (cardsPack_id: string, page?:number, pageCount?:number) => async (dispatch: Dispatch) => {

    // let cardsPack_id = '5eb6a2f72f849402d46c6ac7 '

    try {
        const response = await cardsAPI.getCards({cardsPack_id , page, pageCount})
        dispatch(setCards(response.data.cards))
        dispatch(setCardsInformation(response.data))

    } catch (err: any) {
        console.log(err)
    }


}

export const createCard = (cardsPack_id: string, question?: string, answer?: string, grade?: number):AppThunk =>
    async (dispatch) => {

    try {
        const response = await cardsAPI.createCard({cardsPack_id, question, answer, grade})
        await dispatch(getCardsTC(cardsPack_id))
        console.log(response.data)
        debugger
    } catch (error) {
        debugger
        console.log(error)
    }
}
/*
export const deleteCardsPack = (id: string):AppThunk =>
    async (dispatch) => {

        try {
            const response = await packsAPI.deleteCardsPack(id)
            await dispatch(getPackList())
            debugger
            console.log(response.data)
        } catch (err: any) {
            console.log(err)
        }
    }

export const updateCardsPack = (id: string, title: string):AppThunk =>
    async (dispatch) => {

        try {
            const response = await packsAPI.updateCardsPack(id, title)
            await dispatch(getPackList())
            debugger
            console.log(response.data)
        } catch (err: any) {
            console.log(err)
        }
    }*/


const {setCards, setCardsInformation} = slice.actions
export const cardsReducer = slice.reducer

export type CardsReducerActionsType = ReturnType<typeof setCards>
