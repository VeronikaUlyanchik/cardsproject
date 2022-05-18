import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {profileAPI} from "../../api/ProfileAPI";
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
            dispatch(setAppStatus({status: 'succeeded'}))
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
        status: 'idle' as StatusType,
        error: '',
        isError: false,
        isSuccessful: false,
        _id: ''
    },
    reducers: {
        setIsInitialized: (state, action: PayloadAction<boolean>) => {
            state.IsInitialized = action.payload
        },
        setAppStatus: (state, action: PayloadAction<{ status: StatusType }>) => {
            state.status = action.payload.status
        },
        setAppError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        setIsError: (state, action: PayloadAction<boolean>) => {
            state.isError = action.payload
        },
        setIsSuccessful: (state, action: PayloadAction<boolean>) => {
            state.isSuccessful = action.payload
        }
    }
})

export const {setIsInitialized, setAppStatus, setAppError, setIsError, setIsSuccessful} = appSlice.actions

export default appSlice.reducer;

export type AppActionsType =
    | ReturnType<typeof setIsInitialized>
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof setIsSuccessful>
    | ReturnType<typeof setIsError>
export type StatusType = 'idle' | 'loading' | 'failed' | 'succeeded'