import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {GetMeResponseType, profileAPI} from "../../api/Api";


export interface ProfileStateType {
    user: GetMeResponseType
    status: null | string
    error: null | string
}

const initialState = {
    user: {} as GetMeResponseType,
    status: null,
    error: null,
}


export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setUserProfile: (state: ProfileStateType, action: PayloadAction<GetMeResponseType>) => {
            state.user = action.payload
        }
    },
})

export const {setUserProfile} = profileSlice.actions

export type ProfileActionsType = ReturnType<typeof setUserProfile>

export default profileSlice.reducer;


//thunk-old
export const getUserProfile = () =>
    async (dispatch: Dispatch) => {
        try {
            const res = await profileAPI.getMe()
            dispatch(setUserProfile(res.data))
            console.log(res.data)
        } catch (e) {

        } finally {

        }
    }


export const updateUserProfile = (name: string) =>
    async (dispatch: Dispatch) => {
        try {
            const res = await profileAPI.updateMe(name)
            if (res.data.error === null) {
                dispatch(setUserProfile(res.data.updatedUser))
            }
        } catch (e) {

        } finally {

        }
    }


/*import {Dispatch} from "redux";
import {GetMeResponseType, profileAPI} from "../../api/Api";

enum Profile {
SET_USER_PROFILE = "SET_USER_PROFILE"
}

const initialState = {
user: null
}

export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionsType) => {
switch (action.type) {
    case Profile.SET_USER_PROFILE:
        return {
            ...state,
            ...action.payload
        }

    default:
        return state
}
}

//actionCreators
const setUserProfile = (user: GetMeResponseType) => ({
type: Profile.SET_USER_PROFILE,
payload: {
    user
}
} as const)


//thunk
export const getUserProfile = () =>
async (dispatch: Dispatch) => {
    try {
        const res = await profileAPI.getMe()
        dispatch(setUserProfile(res.data))

    } catch (e) {

    } finally {

    }
}

export const updateUserProfile = (name: string, avatar: string) =>
async (dispatch: Dispatch) => {
    try {
        const res = await profileAPI.updateMe(name, avatar)
        if (res.data.error === null) {
            dispatch(setUserProfile(res.data.updatedUser))
        }
    } catch (e) {

    } finally {

    }
}


// types
type InitialStateType = {
user: null | GetMeResponseType
}

export type ProfileActionsType = ReturnType<typeof setUserProfile>*/
