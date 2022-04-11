import React from 'react';
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import {Login} from './p1-main/m1-ui/component/com1-Login/Login';
import {Profile} from './p1-main/m1-ui/component/com3-Profile/Profile';
import {Register} from "./p1-main/m1-ui/component/com2-Register/Register";
import {PasswordRecovery} from './p1-main/m1-ui/component/com5-PasswordRecovery/PasswordRecovery';
import {NewPasswordSetting} from "./p1-main/m1-ui/component/com6-NewPasswordSetting/NewPasswordSetting";
import {Test} from "./p1-main/m1-ui/component/com7-Test/NewPasswordSetting";
import {Error404} from './p1-main/m1-ui/component/com4-Error404/Error404';


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
            </HashRouter>
        </div>
    );
}

export default App;
