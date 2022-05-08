import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { profileAPI} from "../../api/Api";
import {loggedIn} from "./AuthReducer";

const initialState = {
    IsInitialized: false,
    status: 'idle',
    error: '',
    _id: ''
}

export const fetchInitialized = createAsyncThunk(
    'auth/fetchInitialized',
    async (_, {dispatch}) => {
        try {
            dispatch(setAppStatus({status: 'loading'}))
            const {data, status} = await profileAPI.getMe();
            if(status === 200) {
                dispatch(loggedIn(true))
            }

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
    initialState,
    reducers: {
        setIsInitialized: (state, action: PayloadAction<boolean>) => {
            state.IsInitialized = action.payload
        },
        setAppStatus: (state, action: PayloadAction<{ status: string }>) => {
            state.status = action.payload.status
        },
        setAppError: (state, action: PayloadAction<{ error: string }>) => {
            state.error = action.payload.error
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchInitialized.fulfilled, (state, action) => {
            if (action.payload) {
                state._id = action.payload.id
            }
        })
    }
})

export const {setIsInitialized, setAppStatus} = appSlice.actions

export default appSlice.reducer;


