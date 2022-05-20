import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {modalGradeAPI, UpdatedGradeType} from "../../api/ModalGradeAPI";
import {CardType} from "../../api/CardsAPI";
import {setAppStatus} from "./AppReducer";


const slice = createSlice({
        name: "modalGrade",
        initialState: {
            cards: [] as CardType[],
        },
        reducers: {
            updateCardsGrade(state, action: PayloadAction<UpdatedGradeType>) {
                state.cards = state.cards.map(m => m._id === action.payload.card_id ? {...m, grade: action.payload.grade} : m)
            }
        }
        ,
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


export const modalGradeReducer = slice.reducer
export const {updateCardsGrade} = slice.actions

