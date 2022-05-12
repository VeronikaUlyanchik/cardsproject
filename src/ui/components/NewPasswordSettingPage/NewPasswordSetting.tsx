import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import {Navigate, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {PATH} from "../../../App";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import {StateType} from "../LoginPage/Login";
import {fetchUpdatePassword} from "../../../bll-redux/reducers/ProfileReducer";

type FormikErrorType = {
    password?: string
    repeatPassword?: string
}

export const NewPasswordSetting = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const error = useAppSelector<string>(state => state.app.error)
    const resetPasswordToken = useAppSelector<string>(state => state.auth.token)
    const navigate = useNavigate()


    const formik = useFormik({
        initialValues: {
            password: '',
            repeatPassword: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 6) {
                errors.password = 'Must be 6 characters or more';
            }
            if (!values.repeatPassword) {
                errors.repeatPassword = 'Required';
            } else if (values.repeatPassword.length < 6) {
                errors.repeatPassword = 'Must be 6 characters or more';
            } else if (values.repeatPassword !== values.password) {
                errors.repeatPassword = 'Password does not match';
            }
            return errors;
        },
        onSubmit: values => {
            console.log(values.repeatPassword)
            dispatch(fetchUpdatePassword({password: values.repeatPassword, resetPasswordToken}))
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

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
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
                                                   {value.showPassword ? <VisibilityOff/> : <Visibility/>}
                                               </IconButton>
                                           </InputAdornment>
                                       )
                                   }}
                        />
                        <TextField id="standard"
                                   label="Repeat password"
                                   variant="standard"
                                   margin="normal"
                                   fullWidth
                                   type={value.showPassword ? 'text' : 'password'}
                                   error={!!(formik.touched.repeatPassword && formik.errors.repeatPassword)}
                                   helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
                                   {...formik.getFieldProps("repeatPassword")}
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

                        <Stack spacing={3} sx={{
                            marginTop: '25px',
                        }}>
                            <Button type={'submit'}
                                    variant={'contained'}
                                    color={'primary'}
                                    >Save</Button>
                        </Stack>
                        <Box sx={{
                            marginTop: '20px'
                        }}>

                            <Link
                                component="button"
                                variant="body2"
                                underline="hover"
                                onClick={() => navigate(PATH.PROFILE)}
                            > Return to profile page
                            </Link>
                        </Box>

                    </FormGroup>
                </Box>

            </form>
        </div>
    )
}