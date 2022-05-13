import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {registrationApi, RejectedType} from "../../api/RegisterAPI";

const initialState = {
    isSignedUp: false,
    registrationError: ''
};

const registration = createSlice({
    name: 'registration',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(setSignUpThunk.fulfilled, (state, action) => {
            if (action.payload) state.isSignedUp = action.payload;
        });
        builder.addCase(setSignUpThunk.rejected, (state, action) => {

           if (action.payload) {
               state.registrationError = action.payload
           }
        });
    },
});


export const registrationReducer = registration.reducer;

export const setSignUpThunk = createAsyncThunk<
    boolean,
    {email:string, password:string},
    {rejectValue: RejectedType}
    >(
    'registration/setSignUpThunk',
    async ({email, password}:{email:string, password:string}, { dispatch,rejectWithValue }) => {
        try {
           const res =  await registrationApi.singUp({email, password})
            return true
        } catch (err: any) {
            const error = err.response ? err.response.data.error : (err.message + ', Rejected')
            return rejectWithValue(error)
        }
    }
)

export type RegistrationActionsType = ReturnType<typeof setSignUpThunk>

