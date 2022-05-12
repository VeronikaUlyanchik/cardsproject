import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { profileAPI} from "../../api/ProfileAPI";
import {loggedIn} from "./AuthReducer";
import {setUserProfile} from "./ProfileReducer";

export const fetchInitialized = createAsyncThunk(
    'auth/fetchInitialized',
    async (_, {dispatch}) => {
        try {
            dispatch(setAppStatus({status: 'loading'}))
            const {data} = await profileAPI.getMe();
                dispatch(loggedIn(true))
                dispatch(setUserProfile(data))
            return {id: data._id}
        } catch (err: any) {
            console.log(err)
        } finally {
            dispatch(setIsInitialized(true))
            dispatch(setAppStatus({status: 'succeeded'}))
        }
    })

export const appSlice = createSlice({
    name: 'profile',
    initialState: {
        IsInitialized: false,
        status: 'idle',
        error: '',
        _id: ''
    },
    reducers: {
        setIsInitialized: (state, action: PayloadAction<boolean>) => {
            state.IsInitialized = action.payload
        },
        setAppStatus: (state, action: PayloadAction<{ status: string }>) => {
            state.status = action.payload.status
        },
        setAppError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        }
    }
})

export const {setIsInitialized, setAppStatus, setAppError} = appSlice.actions

export default appSlice.reducer;

export type AppActionsType = ReturnType<typeof setIsInitialized> | ReturnType<typeof setAppStatus>