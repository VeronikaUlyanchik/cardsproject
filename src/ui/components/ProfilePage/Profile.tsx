import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import {PATH} from "../../../App";
import {Navigate} from "react-router-dom";
import {Image, ImageBlock, InputBlock, ProfileWrapper, Title} from "./Profile.style";
import SuperButton from "../../features/SuperButton/SuperButton";
import {updateUserProfile} from "../../../bll-redux/reducers/ProfileReducer";
import {ContentWrapper} from "../../../common/global-styles/CommonStyles.style";
import {StyledInput} from "../../features/SuperInputText/SuperInputText.style";
import {selectUserAvatar, selectUserEmail, selectUserName} from "../../../selectors/UserSelectors";
import {fetchInitialized} from "../../../bll-redux/reducers/AppReducer";
import {fetchLogout} from "../../../bll-redux/reducers/AuthReducer";


export const Profile = () => {
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);
    const dispatch = useAppDispatch()

    const isAuth = useAppSelector<boolean>(state => state.auth.isLoggedIn);
    const userName = useAppSelector(selectUserName)
    const userAvatar = useAppSelector(selectUserAvatar)
    const userEmail = useAppSelector(selectUserEmail)

    useEffect(() => {
        dispatch(fetchInitialized())
    }, [])
    const [nickName, setNickName] = useState<string>(userName)

    const updateUser = () => {
        dispatch(updateUserProfile(nickName))
    }

    const logOut = () => {
        dispatch(fetchLogout())
    }

    const updateNickname = (nickname: string) => setNickName(nickname)

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <>
        <ContentWrapper>
            <ProfileWrapper>
                <Title>Personal Information</Title>
                <ImageBlock>
                    <Image
                        src={userAvatar}
                        alt=""/>
                </ImageBlock>
                <InputBlock>
                    <StyledInput
                        value={userName}
                        onChangeText={updateNickname}
                    />
                    <StyledInput
                        value={userEmail}
                    />
                </InputBlock>
                <div style={{display: 'flex', justifyContent: 'space-around', width: '100%'}}>
                    <SuperButton name={'Cancel'}>
                        Cancel
                    </SuperButton>

                    <SuperButton
                        name={'Save'}
                        onClick={updateUser}
                        bgColor={'#c48798'}>
                        Save
                    </SuperButton>
                    <SuperButton name={'Log Out'} onClick={logOut}/>
                </div>
            </ProfileWrapper>
        </ContentWrapper>
        </>
    )
}
