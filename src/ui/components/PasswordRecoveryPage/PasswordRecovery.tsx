import React from 'react';
import {Box, Button, FormGroup, Link, Stack, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import {Navigate, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {fetchRecoveryPassword} from "../../../bll-redux/reducers/RecoveryPasswordReducer";
import {PATH} from "../../../enum/Path";
import {selectError} from "../../../selectors/AppSelectors";
import {useSelector} from "react-redux";
import {selectPasswordChange, selectSuccess} from "../../../selectors/PasswordSelectors";

type FormikErrorType = {
    email?: string
}

function SendIcon() {
    return null;
}

export const PasswordRecovery = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const error = useAppSelector(selectError)
    const success = useSelector(selectSuccess)

    const formik = useFormik({
            initialValues: {
                email: '',
                error: ''
            },
            validate: (values) => {
                const errors: Partial<FormikErrorType> = {};
                if (!values.email) {
                    errors.email = 'Email field should be filled';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                    errors.email = 'Invalid email address';
                }

                return errors;
            },
            onSubmit: values => {
                dispatch(fetchRecoveryPassword(values.email))
            }
        },
    )

    if(success){
        return <Navigate to={PATH.SEND_MESSAGE}/>
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
            >
                <Box sx={{fontSize: 35}}>
                    Can't login?
                </Box>
                {error && <Box sx={{color: 'red', fontSize: 25}}>Email address not found</Box>}
                <Box sx={{color: 'text.secondary'}}>
                    Enter your email address and we will
                    send you a link to restore access to
                    your account.
                </Box>
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

                    <Stack spacing={2} sx={{
                        marginTop: '35px',
                    }}>
                        <Button type={'submit'}
                                variant={'contained'}
                                color={'primary'}
                                endIcon={<SendIcon/>}
                        >
                            Send
                        </Button>


                    </Stack>

                    <Box sx={{
                        marginTop: '50px'

                    }}><Link
                        component="button"
                        variant="body2"
                        underline="hover"
                        onClick={() => navigate(PATH.REGISTER)}
                    > Create a new account
                    </Link>
                    </Box>
                    <Box sx={{
                        marginTop: '50px'
                    }}> {`Have an account? `}
                        <Link
                            component="button"
                            variant="body2"
                            underline="hover"
                            onClick={() => navigate(PATH.LOGIN)}>
                            Back to the entrance
                        </Link>
                    </Box>

                </FormGroup>
            </Box>
        </form>

    </>)
}