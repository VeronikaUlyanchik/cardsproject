import {combineReducers, createStore} from "redux";
import { Reducer } from "./reducers/reducer";

const reducers = combineReducers({
    reducer: Reducer,
})

const store = createStore(reducers);

export default store;

export type AppStoreType = ReturnType<typeof reducers>;