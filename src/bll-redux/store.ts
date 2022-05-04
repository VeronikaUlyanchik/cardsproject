import {applyMiddleware, combineReducers, createStore} from "redux";
import {Reducer} from "./reducers/reducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
    reducer: Reducer,
})

const store = createStore(reducers, applyMiddleware(thunk));

export default store;

export type AppRootStateType = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch