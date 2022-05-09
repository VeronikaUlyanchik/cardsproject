import React, {useEffect} from 'react';
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom';
import React, {useEffect} from 'react';
import { Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import {Login} from './ui/components/LoginPage/Login';
import {Profile} from './ui/components/ProfilePage/Profile';
import {Register} from "./ui/components/RegisterPage/Register";
import {PasswordRecovery} from './ui/components/PasswordRecoveryPage/PasswordRecovery';
import {NewPasswordSetting} from "./ui/components/NewPasswordSettingPage/NewPasswordSetting";
import {Test} from "./ui/components/Test/NewPasswordSetting";
import {Error404} from './ui/components/ErrorPage/Error404';
import {AppWrapper} from "./common/global-styles/CommonStyles.style";
import {getUserProfile} from "./bll-redux/reducers/ProfileReducer";
import {useAppDispatch} from "./hooks/ReduxHooks";
import {CardsTablePage} from "./ui/components/CardsTable/CardsTablePage";
import {CardsPacksTablePage} from "./ui/components/CardsPackTable/CardsPacksTablePage";
import {LinearProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "./hooks/ReduxHooks";
import {fetchInitialized} from "./bll-redux/reducers/AppReducer";
import {Header} from "./ui/components/Header/Header";


export const PATH = {
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
    PASSWORD_RECOVERY: '/password-recovery',
    NEW_PASSWORD_RECOVERY: '/new-password-recovery',
    TEST: '/test',
    PACKS: '/packs',
    CARDS: '/cards',
}

const App = () => {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector<boolean>(state => state.app.IsInitialized)

    useEffect(()=>{
        dispatch(fetchInitialized())
    },[])

    if(!isInitialized){
        return <div
            style={{top: '30%', textAlign: 'center', width: '100%'}}>
            <LinearProgress/>
        </div>
    }


    return (
        <div className="App">
            <Header/>
            <AppWrapper>
                    <Routes>
                        <Route path={'/'} element={<Navigate to={PATH.LOGIN}/>}/>
                        <Route path={PATH.LOGIN} element={<Login/>}/>
                        <Route path={PATH.REGISTER} element={<Register/>}/>
                        <Route path={PATH.PROFILE} element={<Profile/>}/>
                        <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
                        <Route path={PATH.NEW_PASSWORD_RECOVERY} element={<NewPasswordSetting/>}/>
                        <Route path={PATH.TEST} element={<Test/>}/>
                        <Route path={PATH.PACKS} element={<CardsPacksTablePage/>}/>
                        <Route path={PATH.CARDS} element={<CardsTablePage/>}/>
                        <Route path='*' element={<Error404/>}/>
                    </Routes>
            </AppWrapper>
        </div>
    );
}

export default App;
