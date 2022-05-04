

enum App {
    SET_IS_LOADING = "SET_IS_LOADING"
}

const initialState = {
    isLoading: false
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType) => {
    switch (action.type) {
        case App.SET_IS_LOADING:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }
}

//actionCreators
const setIsLoading = (isLoading: boolean) => ({
    type: App.SET_IS_LOADING,
    payload: {
        isLoading
    }
} as const)


//thunk



// types
type InitialStateType = {
    isLoading: boolean
}

export type AppActionsType = ReturnType<typeof setIsLoading>