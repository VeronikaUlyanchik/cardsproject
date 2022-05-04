import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import {PATH} from "../../../App";
import {Navigate} from "react-router-dom";
import {ImageBlock, InputBlock, ProfileWrapper, Title} from "./Profile.style";
import SuperInputText from "../../features/SuperInputText/SuperInputText";
import SuperButton from "../../features/SuperButton/SuperButton";
import {getUserProfile, updateUserProfile} from "../../../bll-redux/reducers/ProfileReducer";
import {ContentWrapper} from "../../../common/global-styles/CommonStyles.style";


export const Profile = () => {
    const isAuth = true
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.profile)

    const [nickName, setNickName] = useState<string>(user ? user.name : '')
    const [email, setEmail] = useState<string>(user ? user.email : '')

    useEffect(() => {
        dispatch(getUserProfile)
    }, [])

    const updateUser = () => {
        dispatch(updateUserProfile(nickName, email))
    }

    const updateNickname = (nickname: string) => setNickName(nickname)
    const updateEmail = (email: string) => setEmail(email)

    if (!isAuth) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <ContentWrapper>
            <ProfileWrapper>
                <Title>Personal Information</Title>
                <ImageBlock>
                    <img src={user?.avatar} alt=""/>
                </ImageBlock>
                <InputBlock>
                    <SuperInputText
                        value={nickName ? nickName : ''}
                        onChangeText={updateNickname}
                    />
                    <SuperInputText
                        value={email ? email : ''}
                        onChangeText={updateEmail}
                    />
                </InputBlock>
                <div style={{display: 'flex', justifyContent: 'space-around', width: '100%'}}>
                    <SuperButton
                        name={'Cancel'}
                    >
                        Cancel
                    </SuperButton>
                    <SuperButton
                        name={'Save'}
                        onClick={updateUser}
                    >
                        Save
                    </SuperButton>
                </div>
            </ProfileWrapper>
        </ContentWrapper>
    )
}
