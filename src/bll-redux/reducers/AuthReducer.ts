import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, LoginParamsType} from "../../api/Api";

const slice = createSlice({
        name: "auth",
        initialState: {
            isLoggedIn: false,
        },
        reducers: {
            loggedIn(state, action: PayloadAction<{ value: boolean }>) {
                state.isLoggedIn = action.payload.value;
            }
        }
    }
)

export const fetchLogged = createAsyncThunk(
    'auth/fetchLogged',
    async (data: LoginParamsType, {dispatch}) => {
        try {
            const response = await authAPI.login(data);
            if (response.status === 200) {
                dispatch(loggedIn({value: true}))
                console.log(response.data)
                return response.data;
            }
        } catch (err: any) {

            console.log(err)
        }
    }
);

const {loggedIn} = slice.actions
export const authReducer = slice.reducer
