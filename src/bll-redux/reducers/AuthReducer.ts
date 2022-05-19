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
        dispatch(setAppStatus({status: 'loading'}))
        try {
            const res = await authAPI.login(data);
            dispatch(loggedIn(true))
            dispatch(getToken(res.data.token))
            dispatch(setAppStatus({status: 'succeeded'}))
        } catch (e: any) {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log('Error: ', {...e})
            dispatch(setAppStatus({status: 'failed'}))
        } finally {
            dispatch(setAppStatus({status: 'idle'}))
        }
    }
);

export const fetchLogout = createAsyncThunk(
    'auth/fetchLogout',
    async (_, {dispatch}) => {
        dispatch(setAppStatus({status: 'loading'}))
        try {
            await authAPI.logout();
            dispatch(loggedIn(false))
            dispatch(setAppStatus({status: 'succeeded'}))
        } catch (err: any) {
            console.log(err)
            dispatch(setAppStatus({status: 'failed'}))
        } finally {
            dispatch(setAppStatus({status: 'idle'}))
        }
    }
);

export const {loggedIn, getToken} = slice.actions
export const authReducer = slice.reducer
