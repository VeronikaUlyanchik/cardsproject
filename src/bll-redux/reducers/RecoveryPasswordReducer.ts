import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setAppError, setAppStatus} from "./AppReducer";
import { NewPasswordDataType, passwordAPI} from "../../api/PasswordAPI";
import {PATH} from "../../enum/Path";

const slice = createSlice({
        name: "forgot",
        initialState: {
            email: null as string | null,
            success: false,
            token: null as string | null,
            changePassword: false
        },
        reducers: {},
        extraReducers: builder => {
            builder.addCase(fetchRecoveryPassword.fulfilled, (state, action) => {
                if (action.payload) {
                    state.success = action.payload.success
                    state.email = action.payload.email
                }
            })
            builder.addCase(fetchChangePassword.fulfilled, (state, action)=>{
                state.token = null
                state.email = null
                state.changePassword = true
            })
        }
    }
)

export const fetchRecoveryPassword = createAsyncThunk(
    'recovery/fetchRecoveryPassword',
    async (email: string, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setAppStatus({status: 'loading'}))
            const res = await passwordAPI.forgot({
                email, from: 'A',
                message: `<div style="background-color: lime; padding: 15px">
                                            password recovery link: 
                                            <a href='http://localhost:3000/cardsproject#${PATH.CREATE_PASS}/$token$'>
                                            link</a></div>\``
            });
            dispatch(setAppStatus({status: 'succeeded'}))
            return {success: res.data.success, email}

        } catch (err) {
            dispatch(setAppError('Email address not found'))
            return rejectWithValue({})
        }
    }
);

export const fetchChangePassword = createAsyncThunk(
    'profile/fetchUpdatePassword',
    async (data: NewPasswordDataType, {dispatch}) => {
        try {
            dispatch(setAppStatus({status: 'loading'}))
            const res = await passwordAPI.updatePassword(data);
        } catch (err: any) {
            console.log(err)
        } finally {
            dispatch(setAppStatus({status: 'succeeded'}))
        }
    }
)

export const recoveryPasswordReducer = slice.reducer
