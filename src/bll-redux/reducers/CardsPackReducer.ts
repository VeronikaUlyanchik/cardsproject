import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CardsPackParamsType, CardsPackType, GetCardsPackResponse, packsAPI} from "../../api/PacksAPI";
import {setAppStatus, setIsError, setIsSuccessful} from "./AppReducer";

const slice = createSlice({
        name: "cardsPacks",
        initialState: {
            packList: [] as CardsPackType[],
            totalCountPacks: 0,
            packPerPage: 10,
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

export const getPackList = createAsyncThunk(
    'cardPacks/getPackList',
    async (params: CardsPackParamsType, {dispatch}) => {
        dispatch(setAppStatus({status: 'loading'}))
        try {
            const response = await packsAPI.getCardsPack(params);
            dispatch(getPack(response.data.cardPacks))
            dispatch(getPackInformation(response.data))
            dispatch(getPackName(params.packName || ''))
            dispatch(setIsSuccessful(true))
        } catch (err: any) {
            console.warn(err)
            dispatch(setIsError(true))
        } finally {
            dispatch(setAppStatus({status: 'idle'}))
        }
    })

export const createCardsPack = createAsyncThunk(
    'cardPacks/createCardsPack',
    async (title: string, {dispatch}) => {
        dispatch(setAppStatus({status: 'loading'}))
        try {
            const response = await packsAPI.createCardsPack(title);
            await dispatch(getPackList({}))
            console.log(response.data)
            dispatch(setIsSuccessful(true))
        } catch (err: any) {
            console.warn(err)
            dispatch(setIsError(true))
        } finally {
            dispatch(setAppStatus({status: 'idle'}))
        }
    })

export const deleteCardsPack = createAsyncThunk(
    'cardPacks/deleteCardsPack',
    async (id: string, {dispatch}) => {
        dispatch(setAppStatus({status: 'loading'}))
        try {
            const response = await packsAPI.deleteCardsPack(id)
            await dispatch(getPackList({}))
            dispatch(setIsSuccessful(true))
        } catch (err: any) {
            console.warn(err)
            dispatch(setIsError(true))
        } finally {
            dispatch(setAppStatus({status: 'idle'}))
        }
    })

export const updateCardsPack = createAsyncThunk(
    'cardPacks/updateCardsPack',
    async (data: { _id: string, title: string }, {dispatch}) => {
        const {_id, title} = data
        dispatch(setAppStatus({status: 'loading'}))
        try {
            const response = await packsAPI.updateCardsPack(_id, title)
            await dispatch(getPackList({}))
            dispatch(setIsSuccessful(true))
        } catch (err: any) {
            console.warn(err)
            dispatch(setIsError(true))
        } finally {
            dispatch(setAppStatus({status: 'idle'}))
        }
    })


export const {getPack, getPackInformation, getPackName, changePacksPerPage, changePage, searchPackName, changeMinMax} = slice.actions
export const packReducer = slice.reducer

export type CardsPackReducerActionsType = ReturnType<typeof getPack> | ReturnType<typeof getPackInformation>