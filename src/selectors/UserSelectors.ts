import {AppRootStateType} from "../bll-redux/store";

export const selectUserId = (state: AppRootStateType):string => {
    return state.profile.user._id
}

export const selectUserName = (state: AppRootStateType):string => {
    return state.profile.user.name
}

export const selectUserAvatar = (state: AppRootStateType):string | undefined => {
    return state.profile.user.avatar
}

export const selectUserEmail = (state: AppRootStateType):string => {
    return state.profile.user.email
}