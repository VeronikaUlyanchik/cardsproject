import {AppRootStateType} from "../bll-redux/store";

export const selectIsInitialized = (state: AppRootStateType):boolean => {
    return state.app.IsInitialized
}

export const selectError = (state: AppRootStateType):string => {
    return state.app.error
}