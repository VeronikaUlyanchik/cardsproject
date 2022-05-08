import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {Reducer} from "./reducers/reducer";
import profileReducer, {ProfileActionsType} from "./reducers/ProfileReducer";
import appReducer from "./reducers/AppReducer";
import thunkMiddleware from "redux-thunk";
import {authReducer} from "./reducers/AuthReducer";
import {RegistrationActionsType, registrationReducer} from "./reducers/RegisterReducer";
import {recoveryPasswordReducer} from "./reducers/RecoveryPasswordReducer";

const reducers = combineReducers({
    reducer: Reducer,
    app: appReducer,
    profile: profileReducer,
    registration: registrationReducer,
    auth: authReducer,
    recoveryPassword: recoveryPasswordReducer
})

const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
});


export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppAllActionsType =
    | ProfileActionsType
    |RegistrationActionsType

export default store

// @ts-ignore
window.store= store