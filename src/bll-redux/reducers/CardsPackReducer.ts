import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {CardsPackParamsType, CardsPackType, GetCardsPackResponse, packsAPI} from "../../api/PacksAPI";
import {AppRootStateType, AppThunk} from "../store";
import {setAppStatus} from "./AppReducer";

const slice = createSlice({
        name: "cardsPacks",
        initialState: {
            packList: [] as CardsPackType[],
            totalCountPacks: 0,
            packPerPage: 7,
            packName: '',
            page: 1,
            maxCardsCount: 10000,
            minCardsCount: 0,
            maxCardSelected: 10000,
            minCardSelected: 0,

        },
        reducers: {
            getPack(state, action: PayloadAction<CardsPackType[]>) {
                state.packList = action.payload;
            },
            getPackInformation(state, action: PayloadAction<GetCardsPackResponse>) {
                state.totalCountPacks = action.payload.cardPacksTotalCount;
                state.packPerPage = action.payload.pageCount;
                state.page = action.payload.page;
                state.maxCardsCount = action.payload.maxCardsCount;
                state.minCardsCount = action.payload.minCardsCount;
            },
            getPackName(state, action: PayloadAction<string>) {
                state.packName = action.payload
            },
            changePacksPerPage(state, action: PayloadAction<number>){
                state.packPerPage = action.payload
                state.page = 1
            },
            changePage(state, action: PayloadAction<number>){
                state.page = action.payload
            },
            searchPackName(state, action: PayloadAction<string>){
                state.packName = action.payload
                state.page = 1
            },
            changeMinMax(state, action: PayloadAction<number[]>){
                state.maxCardSelected = action.payload[1]
                state.minCardSelected = action.payload[0]
                state.page = 1
            },
        }
    }
)

export const getPackList = (params: CardsPackParamsType) => async (dispatch: Dispatch, getState: () => AppRootStateType) => {

    try {
        const response = await packsAPI.getCardsPack(params);
        dispatch(getPack(response.data.cardPacks))
        dispatch(getPackInformation(response.data))
        dispatch(getPackName(params.packName || ''))

        console.log(response.data)
    } catch (err: any) {
        console.log(err)
    }


}

export const createCardsPack = (title: string): AppThunk =>
    async (dispatch) => {
        dispatch(setAppStatus({status: 'loading'}))
        try {
            const response = await packsAPI.createCardsPack(title);
            await dispatch(getPackList({}))
            console.log(response.data)
        } catch (err: any) {
            console.log(err)
            dispatch(setAppStatus({status: 'failed'}))
        } finally {
            dispatch(setAppStatus({status: 'succeeded'}))
        }
    }

export const deleteCardsPack = (id: string): AppThunk =>
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

export const updateCardsPack = (id: string, title: string): AppThunk =>
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


export const {getPack, getPackInformation, getPackName, changePacksPerPage, changePage, searchPackName, changeMinMax} = slice.actions
export const packReducer = slice.reducer

export type CardsPackReducerActionsType = ReturnType<typeof getPack> | ReturnType<typeof getPackInformation>