import React, {useEffect} from 'react';
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom';
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

    useEffect(() => {
        dispatch(getUserProfile())
    }, [])

    return (
        <div className="App">
            <AppWrapper>
                <HashRouter>
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
                </HashRouter>
            </AppWrapper>
        </div>
    );
}

export default App;
