import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import {RegistrationActionsType, registrationReducer} from "../bll-redux/reducers/RegisterReducer";

const reducers = combineReducers({
    registration: registrationReducer,
})

const store = createStore(reducers, applyMiddleware(
    thunk as ThunkMiddleware<AppRootStateType, any>
));

export default store;

export type AppRootStateType = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;
export type AppAllActionsType = RegistrationActionsType;