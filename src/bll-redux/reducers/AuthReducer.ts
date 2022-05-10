import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, LoginParamsType} from "../../api/Api";
import {setAppStatus} from "./AppReducer";

const slice = createSlice({
        name: "auth",
        initialState: {
            isLoggedIn: false,
            status: 'idle',
            error: null,
        },
        reducers: {
            loggedIn(state, action: PayloadAction<boolean>) {
                state.isLoggedIn = action.payload;
            }
        },
    }
)

export const fetchLogin = createAsyncThunk(
    'auth/fetchLogin',
    async (data: LoginParamsType, {dispatch}) => {
        try {
            dispatch(setAppStatus({status: 'loading'}))
            const res = await authAPI.login(data);
            dispatch(loggedIn(true))
        } catch (err: any) {
            console.log(err)
        } finally {
            dispatch(setAppStatus({status: 'succeeded'}))
        }
    }
);

export const fetchLogout = createAsyncThunk(
    'auth/fetchLogout',
    async (_, {dispatch}) => {
        try {
            dispatch(setAppStatus({status: 'loading'}))
            await authAPI.logout();
            dispatch(loggedIn(false))
            dispatch(setAppStatus({status: 'succeeded'}))
        } catch (err: any) {
            console.log(err)
        }
    }
);

export const {loggedIn} = slice.actions
export const authReducer = slice.reducer
