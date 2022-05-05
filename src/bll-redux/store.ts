import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {Reducer} from "./reducers/reducer";
import profileReducer, {ProfileActionsType} from "./reducers/ProfileReducer";
import appReducer, {AppActionsType,} from "./reducers/AppReducer";

const reducers = combineReducers({
    reducer: Reducer,
    app: appReducer,
    profile: profileReducer,
})

const store = configureStore({
    reducer: reducers
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppAllActionsType =
    | ProfileActionsType
    | AppActionsType

export default store


// import {applyMiddleware, combineReducers, createStore} from "redux";
// import {Reducer} from "./reducers/reducer";
// import thunk, {ThunkMiddleware} from "redux-thunk";
// import {ProfileActionsType, profileReducer} from "./reducers/ProfileReducer";
// import {AppActionsType} from "./reducers/AppReducer";
//
// const reducers = combineReducers({
//     reducer: Reducer,
//     profile: profileReducer,
// })
//
// const store = createStore(reducers, applyMiddleware(
//     thunk as ThunkMiddleware<AppRootStateType, AppAllActionsType>
// ));
//
// export default store;
//
// export type AppRootStateType = ReturnType<typeof reducers>;
// export type AppDispatch = typeof store.dispatch
// export type AppAllActionsType =
//     | ProfileActionsType
//     | AppActionsType
