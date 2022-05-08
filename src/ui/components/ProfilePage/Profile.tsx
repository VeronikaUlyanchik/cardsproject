import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import {PATH} from "../../../App";
import {Navigate} from "react-router-dom";
import {Image, ImageBlock, InputBlock, ProfileWrapper, Title} from "./Profile.style";
import SuperButton from "../../features/SuperButton/SuperButton";
import {updateUserProfile} from "../../../bll-redux/reducers/ProfileReducer";
import {ContentWrapper} from "../../../common/global-styles/CommonStyles.style";
import {GetMeResponseType} from "../../../api/Api";
import {StyledInput} from "../../features/SuperInputText/SuperInputText.style";
import {fetchInitialized} from "../../../bll-redux/reducers/AppReducer";
import {fetchLogout} from "../../../bll-redux/reducers/AuthReducer";


export const Profile = () => {
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);
    const dispatch = useAppDispatch()
    const user = useAppSelector<GetMeResponseType | null>(state => state.profile.user)

    const [nickName, setNickName] = useState<string>(user ? user.name : '')
    const [email, setEmail] = useState<string>(user ? user.email : '')

    useEffect(() => {
        dispatch(fetchInitialized())
    }, [])

    const updateUser = () => {
        dispatch(updateUserProfile(nickName, email))
    }

    const logOut = () => {
        dispatch(fetchLogout())
    }

    const updateNickname = (nickname: string) => setNickName(nickname)
    const updateEmail = (email: string) => setEmail(email)

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <ContentWrapper>
            <ProfileWrapper>
                <Title>Personal Information</Title>
                <ImageBlock>
                    <Image
                        src={user?.avatar ? user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRowITdGdaY753M43p2ZDG39EYzq3LZu5VGMycNIqEdV4P8lHbpmpKMdrY32GwN3vaecb0&usqp=CAU'}
                        alt=""/>
                </ImageBlock>
                <InputBlock>
                    <StyledInput
                        value={nickName ? nickName : ''}
                        onChangeText={updateNickname}
                    />
                    <StyledInput
                        value={email ? email : ''}
                        onChangeText={updateEmail}
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
    )
}
