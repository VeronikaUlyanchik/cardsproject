import {createAsyncThunk, createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {GetMeResponseType, NewPasswordDataType, NewPasswordResponseType, profileAPI} from "../../api/ProfileAPI";
import {setAppStatus} from "./AppReducer";

export interface ProfileStateType {
    user: GetMeResponseType
    status: null | string
    error: null | string
}

const initialState = {
    user: {} as GetMeResponseType,
    status: 'idle',
    error: '',
}


export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setUserProfile: (state: ProfileStateType, action: PayloadAction<GetMeResponseType>) => {
            state.user = action.payload
        },
        // setNewPassword: (state, action: PayloadAction<string>) => {
        //     state.password = action.payload
        // }
    },
})

export const {setUserProfile} = profileSlice.actions

export type ProfileActionsType = ReturnType<typeof setUserProfile>

export default profileSlice.reducer;

//thunk
export const updateUserProfile = (name?: string , avatar?: string) =>
    async (dispatch: Dispatch) => {
        try {
            const res = await profileAPI.updateMe(name || '')
                dispatch(setUserProfile(res.data.updatedUser))
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(setAppStatus({status: 'succeeded'}))
        }
    }

export const fetchUpdatePassword = createAsyncThunk(
    'profile/fetchUpdatePassword',
    async ({password, resetPasswordToken}: { password: string, resetPasswordToken: string }, {dispatch}) => {
        try {
            dispatch(setAppStatus({status: 'loading'}))
            const res = await profileAPI.updatePassword({password, resetPasswordToken});
            // dispatch(setNewPassword(res.data.token))
            console.log(res.data.token)
        } catch (err: any) {
            console.log(err)
        } finally {
            dispatch(setAppStatus({status: 'succeeded'}))
        }
    }
)


