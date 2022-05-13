import {AppRootStateType} from "../bll-redux/store";

export const selectIsLoggedIn = (state: AppRootStateType):boolean => {
    return state.auth.isLoggedIn
}

export const selectResetPasswordToken = (state: AppRootStateType):string => {
    return state.auth.token
}