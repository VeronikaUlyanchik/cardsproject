import {applyMiddleware, combineReducers, createStore} from "redux";
import {Reducer} from "./reducers/reducer";
import thunk, {ThunkMiddleware} from "redux-thunk";
import {ProfileActionsType, profileReducer} from "./reducers/ProfileReducer";
import {AppActionsType} from "./reducers/AppReducer";

const reducers = combineReducers({
    reducer: Reducer,
    profile: profileReducer,
})

const store = createStore(reducers, applyMiddleware(
    thunk as ThunkMiddleware<AppRootStateType, AppAllActionsType>
));

export default store;

export type AppRootStateType = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch
export type AppAllActionsType =
    | ProfileActionsType
    | AppActionsType