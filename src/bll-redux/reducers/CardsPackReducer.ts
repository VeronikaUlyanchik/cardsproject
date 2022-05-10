import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {CardsPackParamsType, CardsPackType, packsAPI} from "../../api/Api";
import {AppRootStateType, AppThunk} from "../store";

const slice = createSlice({
        name: "cardsPacks",
        initialState: {
            packList: [] as CardsPackType[],
        },
        reducers: {
            getPack(state, action: PayloadAction<CardsPackType[]>) {
                state.packList = action.payload;
            },
        }
    }
)

export const getPackList = (params: CardsPackParamsType) => async (dispatch: Dispatch, getState: ()=>AppRootStateType ) => {
    // const userId = getState().profile.user?._id

    try {
        const response = await packsAPI.getCardsPack(params);
        dispatch(getPack(response.data.cardPacks))

        console.log(response.data)
    } catch (err: any) {
        console.log(err)
    }


}

export const createCardsPack = (title: string):AppThunk =>
    async (dispatch) => {

    try {
        const response = await packsAPI.createCardsPack(title);
        await dispatch(getPackList({}))
        console.log(response.data)
    } catch (err: any) {
        console.log(err)
    }
}

export const deleteCardsPack = (id: string):AppThunk =>
    async (dispatch) => {

        try {
            const response = await packsAPI.deleteCardsPack(id)
            await dispatch(getPackList({}))
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
            await dispatch(getPackList({}))
            debugger
            console.log(response.data)
        } catch (err: any) {
            console.log(err)
        }
    }


const {getPack} = slice.actions
export const packReducer = slice.reducer

export type CardsPackReducerActionsType = ReturnType<typeof getPack>