import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {cardsAPI, registrationDataType} from "../../api/Api";
import {Dispatch} from "react";


const initialState = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 0
};


type InitStateType = {
    cardPacks: CardsType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
};

type CardsType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
}
const cards = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        setCards(state: InitStateType, action: PayloadAction<InitStateType>) {
            state = action.payload
        },
    },

});

export const {setCards} = cards.actions;
export const cardsReducer = cards.reducer;

export const setCardsThunk = (page:number) => (dispatch: Dispatch<any>) => {
    cardsAPI.getAllCards(page).then((res)=> {
        dispatch(setCards(res.data))
        console.log(res.data)
    }).catch((error)=> {

    })
};



export type RegistrationActionsType = ReturnType<typeof setCardsThunk>

