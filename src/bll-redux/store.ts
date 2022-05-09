import {combineReducers, configureStore, ThunkAction} from '@reduxjs/toolkit'
import {Reducer} from "./reducers/reducer";
import profileReducer, {ProfileActionsType} from "./reducers/ProfileReducer";
import appReducer, {AppActionsType,} from "./reducers/AppReducer";
import {RegistrationActionsType, registrationReducer} from "../bll-redux/reducers/RegisterReducer";
import thunkMiddleware from "redux-thunk";
import {authReducer} from "./reducers/AuthReducer";
import {CardsPackReducerActionsType, packReducer} from "./reducers/CardsPackReducer";
import {cardsReducer, CardsReducerActionsType} from "./reducers/CardsReducer";

const reducers = combineReducers({
    reducer: Reducer,
    app: appReducer,
    profile: profileReducer,
    registration: registrationReducer,
    auth: authReducer,
    packList: packReducer,
    cards: cardsReducer,
})

const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
});


export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppAllActionsType =
    | ProfileActionsType
    | AppActionsType
    | RegistrationActionsType
    | CardsReducerActionsType
    | CardsPackReducerActionsType

export default store


export type AppThunk<ReturnType = void> =
// @ts-ignore
    ThunkAction<ReturnType, AppRootStateType, unknown, AppAllActionsType>

// @ts-ignore
window.store= store