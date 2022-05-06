import React from 'react';
import {HashRouter, Navigate, NavLink, Route, Routes} from 'react-router-dom';
import './App.css';
import {Login} from './ui/components/LoginPage/Login';
import {Profile} from './ui/components/ProfilePage/Profile';
import {Register} from "./ui/components/RegisterPage/Register";
import {PasswordRecovery} from './ui/components/PasswordRecoveryPage/PasswordRecovery';
import {NewPasswordSetting} from "./ui/components/NewPasswordSettingPage/NewPasswordSetting";
import {Test} from "./ui/components/Test/NewPasswordSetting";
import {Error404} from './ui/components/ErrorPage/Error404';
import {AppWrapper} from "./common/global-styles/CommonStyles.style";


export const PATH = {
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
    PASSWORD_RECOVERY: '/password-recovery',
    NEW_PASSWORD_RECOVERY: '/new-password-recovery',
    TEST: '/test',
}

const App = () => {
    return (
        <div className="App">
            <HashRouter>
            <div>
                <NavLink to={PATH.LOGIN}>Login</NavLink>
                <NavLink to={PATH.REGISTER}>Register</NavLink>
                <NavLink to={PATH.PROFILE}>Profile</NavLink>
                <NavLink to={PATH.PASSWORD_RECOVERY}>PasswordRecovery</NavLink>
            </div>
            <AppWrapper>
                <Routes>
                    <Route path={'/'} element={<Navigate to={PATH.LOGIN}/>}/>
                    <Route path={PATH.LOGIN} element={<Login/>}/>
                    <Route path={PATH.REGISTER} element={<Register/>}/>
                    <Route path={PATH.PROFILE} element={<Profile/>}/>
                    <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
                    <Route path={PATH.NEW_PASSWORD_RECOVERY} element={<NewPasswordSetting/>}/>
                    <Route path={PATH.TEST} element={<Test/>}/>
                    <Route path='*' element={<Error404/>}/>
                </Routes>

            </AppWrapper>
            </HashRouter>
        </div>
    );
}

export default App;
