import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import {PATH} from "../../../App";
import {Navigate} from "react-router-dom";
import {Image, ImageBlock, InputBlock, ProfileWrapper, StyledInput, Title} from "./Profile.style";
import {updateUserProfile} from "../../../bll-redux/reducers/ProfileReducer";
import {ContentWrapper} from "../../../common/global-styles/CommonStyles.style";
import {selectUserAvatar, selectUserEmail, selectUserName} from "../../../selectors/UserSelectors";
import {fetchLogout} from "../../../bll-redux/reducers/AuthReducer";
import Button from '@mui/material/Button';


export const Profile = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);
    const userName = useAppSelector(selectUserName)
    const userAvatar = useAppSelector(selectUserAvatar)
    const userEmail = useAppSelector(selectUserEmail)

    const [nickName, setNickName] = useState<string>(userName)

    // useEffect(() => {
    //     dispatch(fetchInitialized())
    // }, [])

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
                            value={nickName}
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
