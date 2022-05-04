import {Dispatch} from "redux";
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

export type ProfileActionsType = ReturnType<typeof setUserProfile>