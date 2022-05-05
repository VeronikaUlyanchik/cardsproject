import {combineReducers} from "redux";
import {Reducer} from "./reducers/reducer";
import thunkMiddleware from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./reducers/AuthReducer";

const reducers = combineReducers({
    reducer: Reducer,
    auth: authReducer
})

const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
});

export default store;

export type AppRootStateType = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch