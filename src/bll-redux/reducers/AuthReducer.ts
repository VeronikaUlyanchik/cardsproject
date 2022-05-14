import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, LoginParamsType} from "../../api/AuthAPI";
import {setAppStatus} from "./AppReducer";

const slice = createSlice({
        name: "auth",
        initialState: {
            isLoggedIn: false,
            token: '',
            status: 'idle',
            error: null,
        },
        reducers: {
            loggedIn(state, action: PayloadAction<boolean>) {
                state.isLoggedIn = action.payload;
            },
            getToken(state, action: PayloadAction<string>) {
                state.token = action.payload;
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
            dispatch(getToken(res.data.token))
        } catch (e: any) {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log('Error: ', {...e})
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
        } catch (err: any) {
            console.log(err)
        } finally {
            dispatch(setAppStatus({status: 'succeeded'}))
        }
    }
);

export const {loggedIn, getToken} = slice.actions
export const authReducer = slice.reducer
