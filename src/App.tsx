import React, {useEffect} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import {Login} from './ui/components/LoginPage/Login';
import {Profile} from './ui/components/ProfilePage/Profile';
import {Register} from "./ui/components/RegisterPage/Register";
import {PasswordRecovery} from './ui/components/PasswordRecoveryPage/PasswordRecovery';
import {NewPasswordSetting} from "./ui/components/NewPasswordSettingPage/NewPasswordSetting";
import {Test} from "./ui/components/Test/NewPasswordSetting";
import {Error404} from './ui/components/ErrorPage/Error404';
import {AppWrapper} from "./common/global-styles/CommonStyles.style";
import {LinearProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "./hooks/ReduxHooks";
import {fetchInitialized} from "./bll-redux/reducers/AppReducer";
import {Header} from "./ui/features/Header/Header";
import {CardsPacksTablePage} from "./ui/components/CardsPackTablePage/CardsPacksTablePage";
import {CardsTablePage} from "./ui/components/CardsTablePage/CardsTablePage";
import {selectIsInitialized, selectStatus} from "./selectors/AppSelectors";
import { PATH } from './enum/Path';
import SendMessage from "./ui/components/SendMessage/SendMessage";

const App = () => {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(selectIsInitialized)
    const isLoading = useAppSelector(selectStatus)

    useEffect(()=>{
        dispatch(fetchInitialized())
    },[])

    if(!isInitialized){
        return <div
            style={{top: '30%', width: '100%'}}>
            <LinearProgress/>
        </div>
    }

    return (
        <div className="App">
            <Header/>
            {
                isLoading === 'loading' && <div style={{position: 'absolute', top: '0', width: '100%'}}>
                <LinearProgress/>
            </div>
            }
            <AppWrapper>
                    <Routes>
                        <Route path={'/'} element={<Navigate to={PATH.LOGIN}/>}/>
                        <Route path={PATH.LOGIN} element={<Login/>}/>
                        <Route path={PATH.REGISTER} element={<Register/>}/>
                        <Route path={PATH.PROFILE} element={<Profile/>}/>
                        <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
                        <Route path={PATH.CREATE_PASS + '/:token'} element={<NewPasswordSetting/>}/>
                        <Route path={PATH.SEND_MESSAGE} element={<SendMessage/>}/>
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
