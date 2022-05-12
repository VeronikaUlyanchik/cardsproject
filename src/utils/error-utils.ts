import {Dispatch} from 'redux'
import {setAppError, setAppStatus} from "../bll-redux/reducers/AppReducer";


export const handleServerAppError = (data: any, dispatch: Dispatch) => {
    if (data.error) {
        dispatch(setAppError(data.error[0]))
    } else {
        dispatch(setAppError('Some error occurred'))
    }
    dispatch(setAppStatus({status: 'failed'}))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(setAppError(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatus({status: 'failed'}))
}