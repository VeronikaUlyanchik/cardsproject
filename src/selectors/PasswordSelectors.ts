import {AppRootStateType} from "../bll-redux/store";

export const selectPasswordChange = (state: AppRootStateType):boolean => {
    return state.recoveryPassword.changePassword
}
