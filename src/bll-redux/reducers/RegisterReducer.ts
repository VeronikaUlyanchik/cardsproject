import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {registrationApi, registrationDataType} from "../../api/Api";

const initialState = {
    isSignedUp: false,
    registrationError: ''

};

type InitStateType = {
    isSignedUp: boolean
    registrationError: string
};

const registration = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        // setSignedUpStatus(state: InitStateType, action: PayloadAction<boolean>) {
        //     state.isSignedUp = action.payload
        // },
        // setRegistrationError(state: InitStateType, action: PayloadAction<string>) {
        //     state.registrationError = action.payload
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(setSignUpThunk.fulfilled, (state, action) => {
            state.isSignedUp = action.payload;
        });
        builder.addCase(setSignUpThunk.rejected, (state, action) => {
            //@ts-ignore
            state.registrationError = action.payload ? action.payload : '';
        });
    },
});

// export const {setSignedUpStatus , setRegistrationError} = registration.actions;
export const registrationReducer = registration.reducer;

// export const setSignUpThunk = (data: registrationDataType) => (dispatch: Dispatch<AppAllActionsType>) => {
//     registrationApi.singUp(data).then((res)=> {
//         dispatch(setSignedUpStatus(true))
//     }).catch((error)=> {
//         dispatch(setRegistrationError(error.response.data.error))
//     })
// };

export const setSignUpThunk = createAsyncThunk(
    'registration/setSignUpThunk',
    async (data: registrationDataType, { rejectWithValue }) => {
        try {
           const res =  await registrationApi.singUp(data)
            return true
        } catch (err: any) {
            // console.log(err.response)
            return rejectWithValue(err.response.data.error)
        }
    }
)

export type RegistrationActionsType = ReturnType<typeof setSignUpThunk>

