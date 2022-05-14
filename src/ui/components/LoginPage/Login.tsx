import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import {useFormik} from "formik";
import {Navigate, useNavigate} from "react-router-dom";
import {fetchLogin} from "../../../bll-redux/reducers/AuthReducer";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import FormGroup from '@mui/material/FormGroup';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import {PATH} from "../../../enum/Path";
import {selectIsLoggedIn} from "../../../selectors/AuthSelectors";
import {selectError} from "../../../selectors/AppSelectors";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export interface StateType {
    password: string;
    showPassword: boolean;
}

export const Login = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const error = useAppSelector(selectError)
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 6) {
                errors.password = 'Must be 6 characters or more';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(fetchLogin(values))
            formik.resetForm();
        },
    })

    const [value, setValue] = useState<StateType>({
        password: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValue({
            ...value,
            showPassword: !value.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Box
                    sx={{
                        width: 300,
                        height: 400,
                        backgroundColor: 'white',
                        opacity: [0.9, 0.8, 0.8],
                        p: 10,
                        borderRadius: '20px',
                        boxShadow: '20',
                    }}
                > {error && <Box sx={{fontSize: 25, color: 'red'}}>Email address not found or incorrect password</Box>}
                    <FormGroup>
                        <TextField id="standard"
                                   label="Login"
                                   variant="standard"
                                   margin="normal"
                                   fullWidth
                                   error={!!(formik.touched.email && formik.errors.email)}
                                   helperText={formik.touched.email && formik.errors.email}
                                   {...formik.getFieldProps("email")}/>
                        <TextField id="standard-basic"
                                   label="Password"
                                   variant="standard"
                                   margin="normal"
                                   fullWidth
                                   type={value.showPassword ? 'text' : 'password'}
                                   error={!!(formik.touched.password && formik.errors.password)}
                                   helperText={formik.touched.password && formik.errors.password}
                                   {...formik.getFieldProps("password")}
                                   InputProps={{
                                       endAdornment: (
                                           <InputAdornment position="end">
                                               <IconButton
                                                   aria-label="toggle password visibility"
                                                   onClick={handleClickShowPassword}
                                                   onMouseDown={handleMouseDownPassword}>
                                                   {value.showPassword ? <Visibility/> : <VisibilityOff/>}
                                               </IconButton>
                                           </InputAdornment>
                                       )
                                   }}
                        />
                        <FormControlLabel sx={{
                            marginTop: '25px',

                        }}
                                          control={
                                              <Checkbox
                                                  defaultChecked color="default"
                                                  {...formik.getFieldProps("rememberMe")} />
                                          }
                                          label="Remember me"
                        />
                        <Stack spacing={3} sx={{
                            marginTop: '25px',
                        }}>
                            <Button type={'submit'}
                                    variant={'contained'}
                                    color={'primary'}>Log in</Button>
                        </Stack>
                        <Box sx={{
                            marginTop: '20px'
                        }}>

                            <Link
                                component="button"
                                variant="body2"
                                underline="hover"
                                onClick={() => navigate(PATH.PASSWORD_RECOVERY)}
                            > Forgot password
                            </Link>
                        </Box>
                        <Box sx={{
                            marginTop: '25px'
                        }}>
                            Don't have an account yet?
                            <Button variant="text"
                                    onClick={() => navigate(PATH.REGISTER)}>Sign Up</Button>
                        </Box>
                    </FormGroup>
                </Box>

            </form>
        </div>
    )
}