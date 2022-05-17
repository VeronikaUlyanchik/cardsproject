import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {cardsAPI, CardType, GetCardsResponseType} from "../../api/CardsAPI";
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
debugger
    try {
        const response = await cardsAPI.createCard(cardsPack_id, question, answer, grade)
        debugger
        await dispatch(getCardsTC(cardsPack_id))
        console.log(response.data)
    } catch (error) {
        debugger
        console.log(error)
    }
}

export const deleteCardTC = (packId: string, id: string):AppThunk =>
    async (dispatch) => {

        try {
            const response = await cardsAPI.deleteCard(id)
            await dispatch(getCardsTC(packId))
            // debugger
            // console.log(response.data)
        } catch (err: any) {
            console.log(err)
        }
    }

export const updateCardTC = (cardsPackId: string, cardId: string, question: string, answer: string):AppThunk =>
    async (dispatch) => {

        try {
            const response = await cardsAPI.updateCard({_id: cardId, question, answer})
            await dispatch(getCardsTC(cardsPackId))
        } catch (err: any) {
            console.log(err)
        }
    }


const {setCards, setCardsInformation} = slice.actions
export const cardsReducer = slice.reducer

export type CardsReducerActionsType = ReturnType<typeof setCards>
