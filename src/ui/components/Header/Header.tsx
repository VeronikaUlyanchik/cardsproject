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
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../hooks/ReduxHooks";

const PATH = {
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
    PASSWORD_RECOVERY: '/password-recovery',
    NEW_PASSWORD_RECOVERY: '/new-password-recovery',
    TEST: '/test',
}

const pages = [ PATH.PROFILE, PATH.REGISTER, PATH.PASSWORD_RECOVERY];
const settings = [PATH.PROFILE, 'Logout'];

export const Header = () => {

    const navigate = useNavigate()
    const isInitialized = useAppSelector<boolean>(state => state.app.IsInitialized)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    console.log(isInitialized, isLoggedIn)

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/login"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        CARDS
                    </Typography>


                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={()=>navigate(page)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.slice(1)}
                            </Button>
                        ))}
                    </Box>

                    { isLoggedIn &&  <Box sx={{ flexGrow: 0 }}>

                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={()=> navigate(PATH.LOGIN)}>
                            <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                            ))}
                            </Menu>
                    </Box>}

                    {!isLoggedIn && <Box sx={{flexGrow: 0}}>
                        <Button
                            key={PATH.LOGIN}
                            onClick={() => navigate(PATH.LOGIN)}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            {PATH.LOGIN.slice(1)}
                        </Button>
                    </Box>}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
