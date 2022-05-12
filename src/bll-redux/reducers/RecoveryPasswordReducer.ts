import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppError, setAppStatus} from "./AppReducer";
import {authAPI, ForgotDataType} from "../../api/AuthAPI";

const slice = createSlice({
        name: "recovery",
        initialState: {
            email: '',
            status: 'idle',
            error: null,
        },
        reducers: {
            recoveryPassword(state, action: PayloadAction<string>) {
                state.email = action.payload;
            }
        },
    }
)

export const fetchRecoveryPassword = createAsyncThunk(
    'recovery/fetchRecoveryPassword',
    async (data: ForgotDataType, {dispatch}) => {
        try {
            dispatch(setAppStatus({status: 'loading'}))
            const res = await authAPI.forgot(data);

            dispatch(recoveryPassword(res.data.email))
            dispatch(setAppStatus({status: 'succeeded'}))
        } catch (err) {
           dispatch(setAppError('Email address not found'))
        }
    }
);


export const {recoveryPassword} = slice.actions
export const recoveryPasswordReducer = slice.reducer
