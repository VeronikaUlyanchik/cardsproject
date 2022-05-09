import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import {PATH} from "../../../App";
import {Navigate} from "react-router-dom";
import {Image, ImageBlock, InputBlock, ProfileWrapper, Title} from "./Profile.style";
import SuperButton from "../../features/SuperButton/SuperButton";
import {updateUserProfile} from "../../../bll-redux/reducers/ProfileReducer";
import {ContentWrapper} from "../../../common/global-styles/CommonStyles.style";
import {StyledInput} from "../../features/SuperInputText/SuperInputText.style";
import {selectUserAvatar, selectUserEmail, selectUserName} from "../../../selectors/UserSelectors";


export const Profile = () => {
    const dispatch = useAppDispatch()

    const isAuth = useAppSelector<boolean>(state => state.auth.isLoggedIn);
    const userName = useAppSelector(selectUserName)
    const userAvatar = useAppSelector(selectUserAvatar)
    const userEmail = useAppSelector(selectUserEmail)

    const [nickName, setNickName] = useState<string>(userName)

    const updateUser = () => {
        dispatch(updateUserProfile(nickName))
    }

    const updateNickname = (nickname: string) => setNickName(nickname)

    if (!isAuth) {
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
                </div>
            </ProfileWrapper>
        </ContentWrapper>
        </>
    )
}
