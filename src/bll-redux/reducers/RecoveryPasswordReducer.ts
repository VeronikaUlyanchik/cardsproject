import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, ForgotDataType, GetMeResponseType} from "../../api/Api";
import {setAppStatus} from "./AppReducer";
import {PATH} from "../../App";

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
        } catch (err: any) {
            console.log(err)
        }
    }
);


export const {recoveryPassword} = slice.actions
export const recoveryPasswordReducer = slice.reducer
