import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface AppStateType {
    isLoading: boolean
}

const initialState = {
    isLoading: false
}


export const appSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setIsLoading: (state: AppStateType, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        }
    },
})

export const {setIsLoading} = appSlice.actions

export type AppActionsType = ReturnType<typeof setIsLoading>

export default appSlice.reducer;


// enum App {
//     SET_IS_LOADING = "SET_IS_LOADING"
// }
//
// const initialState = {
//     isLoading: false
// }
//
// export const appReducer = (state: InitialStateType = initialState, action: AppActionsType) => {
//     switch (action.type) {
//         case App.SET_IS_LOADING:
//             return {
//                 ...state,
//                 ...action.payload
//             }
//
//         default:
//             return state
//     }
// }
//
// //actionCreators
// const setIsLoading = (isLoading: boolean) => ({
//     type: App.SET_IS_LOADING,
//     payload: {
//         isLoading
//     }
// } as const)
//
//
// //thunk
//
//
//
// // types
// type InitialStateType = {
//     isLoading: boolean
// }
//
// export type AppActionsType = ReturnType<typeof setIsLoading>
