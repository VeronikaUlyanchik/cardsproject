import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {GetMeResponseType, profileAPI} from "../../api/Api";
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
        setUserProfile: (state: ProfileStateType, action: PayloadAction<GetMeResponseType >) => {
            state.user = action.payload
        }
    },
})

export const {setUserProfile} = profileSlice.actions

export type ProfileActionsType = ReturnType<typeof setUserProfile>

export default profileSlice.reducer;


//thunk-old
export const updateUserProfile = (name: string, avatar: string) =>
    async (dispatch: Dispatch) => {
        try {
            const res = await profileAPI.updateMe(name)
            if (res.data.error === null) {
                dispatch(setUserProfile(res.data.updatedUser))
            }
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(setAppStatus({status: 'succeeded'}))
        }
    }


