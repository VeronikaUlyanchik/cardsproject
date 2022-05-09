import React, {useState} from 'react';
import {useFormik} from "formik";
import {setSignUpThunk} from "../../../bll-redux/reducers/RegisterReducer";
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import {Navigate, useNavigate} from 'react-router-dom';
import {PATH} from "../../../App";
import {Box, Button, FormGroup, IconButton, InputAdornment, Stack, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {StateType} from "../LoginPage/Login";

type FormikErrorType = {
    email: string
    password: string
    repeatedPassword: string
}

export const Register = () => {

    const dispatch = useAppDispatch();
    const {isSignedUp, registrationError} = useAppSelector(state => state.registration)
    const navigate = useNavigate()

    const formik = useFormik({
            initialValues: {
                email: '',
                password: '',
                repeatedPassword: ''
            },
            validate: (values) => {
                const errors: Partial<FormikErrorType> = {};
                if (!values.email) {
                    errors.email = 'Email field should be filled';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                    errors.email = 'Invalid email address';
                }
                if (!values.password) {
                    errors.password = 'Password field should be filled'
                } else if (values.password.length < 7) {
                    errors.password = 'Length should be more then 7'
                }
                if (!values.repeatedPassword) {
                    errors.repeatedPassword = 'Enter the password again'
                } else if (values.repeatedPassword !== values.password) {
                    errors.repeatedPassword = 'The passwords entered in both passwords fields should match.'
                }
                return errors;
            },
            onSubmit: values => {
                dispatch(setSignUpThunk(values))
            }
        },
    )

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

    if (isSignedUp) {
        return <Navigate to={PATH.LOGIN}/>
    }
    return (<>
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
                > <Box sx={{fontSize: 35}}>Register</Box>
                    <FormGroup>
                        <TextField id="standard-email-input"
                                   label="Email"
                                   type="email"
                                   variant="standard"
                                   autoComplete="current-password"
                                   margin="normal"
                                   fullWidth
                                   error={!!(formik.touched.email && formik.errors.email)}
                                   helperText={formik.touched.email && formik.errors.email}
                                   {...formik.getFieldProps('email')}/>

                        <TextField id="outlined-password-input"
                                   label="Password"
                                   autoComplete="current-password"
                                   margin="normal"
                                   variant="standard"
                                   fullWidth
                                   type={value.showPassword ? 'text' : 'password'}
                                   error={!!(formik.touched.password && formik.errors.password)}
                                   helperText={formik.touched.password && formik.errors.password}
                                   {...formik.getFieldProps('password')}
                                   InputProps={{
                                       endAdornment: (
                                           <InputAdornment position="end">
                                               <IconButton
                                                   aria-label="toggle password visibility"
                                                   onClick={handleClickShowPassword}
                                                   onMouseDown={handleMouseDownPassword}>
                                                   {value.showPassword ? <VisibilityOff/> : <Visibility/>}
                                               </IconButton>
                                           </InputAdornment>
                                       )
                                   }}
                        />
                        <TextField id="outlined-repeatedPassword-input"
                                   label="Repeated password"
                                   type={value.showPassword ? 'text' : 'password'}
                                   autoComplete="current-password"
                                   margin="normal"
                                   variant="standard"
                                   fullWidth
                                   error={!!(formik.touched.repeatedPassword && formik.errors.repeatedPassword)}
                                   helperText={formik.touched.repeatedPassword && formik.errors.repeatedPassword}
                                   {...formik.getFieldProps('repeatedPassword')}
                                   InputProps={{
                                       endAdornment: (
                                           <InputAdornment position="end">
                                               <IconButton
                                                   aria-label="toggle password visibility"
                                                   onClick={handleClickShowPassword}
                                                   onMouseDown={handleMouseDownPassword}>
                                                   {value.showPassword ? <VisibilityOff/> : <Visibility/>}
                                               </IconButton>
                                           </InputAdornment>
                                       )
                                   }}

                        />
                        <Stack spacing={2} sx={{
                            marginTop: '35px',
                        }}>
                            <Button type={'submit'} variant={'contained'} color={'primary'}>Sign Up</Button>

                        </Stack>
                        <Box sx={{
                            marginTop: '50px'
                        }}>Have an account?
                            <Button variant="text" onClick={() => navigate(PATH.LOGIN)}>Entrance</Button>
                        </Box>

                    </FormGroup>
                </Box>
            </form>
            {registrationError ? registrationError : ''}
        </>
    )
}