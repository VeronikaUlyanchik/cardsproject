import React, {ChangeEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import {Navigate} from "react-router-dom";
import {Image, ImageBlock, InputBlock, ProfileWrapper, StyledInput, Title} from "./Profile.style";
import {updateUserProfile} from "../../../bll-redux/reducers/ProfileReducer";
import {ContentWrapper} from "../../../common/global-styles/CommonStyles.style";
import {selectUserAvatar, selectUserEmail, selectUserName} from "../../../selectors/UserSelectors";
import {fetchLogout} from "../../../bll-redux/reducers/AuthReducer";
import Button from '@mui/material/Button';
import {fetchInitialized} from "../../../bll-redux/reducers/AppReducer";
import {PATH} from "../../../enum/Path";
import {selectIsLoggedIn} from "../../../selectors/AuthSelectors";


export const Profile = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const userName = useAppSelector(selectUserName)
    const userAvatar = useAppSelector(selectUserAvatar)
    const userEmail = useAppSelector(selectUserEmail)

    const [nickName, setNickName] = useState<undefined | string>(undefined)

    useEffect(() => {
        dispatch(fetchInitialized())
    }, [])

    const updateUser = () => {
        dispatch(updateUserProfile(nickName))
    }

    const logOut = () => {
        dispatch(fetchLogout())
        return <Navigate to={PATH.LOGIN}/>
    }

    const updateNickname = (e: ChangeEvent<HTMLInputElement>) => {
        setNickName(e.currentTarget.value)
    }

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
                            value={nickName ? nickName : userName}
                            onChange={updateNickname}
                        />
                        <StyledInput
                            value={userEmail}
                        />

                    </InputBlock>
                    <div style={{display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '40px'}}>
                        <Button variant="contained">
                            Cancel
                        </Button>

                        <Button variant="contained"
                                onClick={updateUser}>
                            Save
                        </Button>
                        <Button variant="contained"
                                onClick={logOut}>
                            Log Out
                        </Button>
                    </div>
                </ProfileWrapper>
            </ContentWrapper>
        </>
    )
}
