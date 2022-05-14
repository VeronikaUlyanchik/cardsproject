import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {Navigate, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import {selectUserAvatar} from "../../../selectors/UserSelectors";
import {PATH} from "../../../enum/Path";
import {selectIsLoggedIn} from "../../../selectors/AuthSelectors";
import {fetchLogout} from "../../../bll-redux/reducers/AuthReducer";


const pages = [PATH.PACKS];

export const Header = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const avatar = useAppSelector(selectUserAvatar)

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logOut = () => {
        dispatch(fetchLogout())
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}>
                        CARDS
                    </Typography>
                    <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                    </Typography>
                    {isLoggedIn && <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => navigate(page)}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                {page.slice(1)}
                            </Button>
                        ))}
                    </Box>}
                    {isLoggedIn && <Box>
                        <Tooltip title="Settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar sx={{flexGrow: 0}} alt="Remy Sharp"
                                        src={avatar ?? "/static/images/avatar/2.jpg"}/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={() => navigate(PATH.PROFILE)}>Profile</MenuItem>
                            <MenuItem onClick={logOut}>Logout</MenuItem>
                        </Menu>
                    </Box>}
                </Toolbar>
            </Container>
        </AppBar>
    )
};