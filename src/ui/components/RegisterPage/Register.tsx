import React from 'react';
import {useFormik} from "formik";
import {setSignUpThunk} from "../../../bll-redux/reducers/RegisterReducer";
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import { Navigate } from 'react-router-dom';
import {PATH} from "../../../App";
import SuperInputText from "../../../ui/features/SuperInputText/SuperInputText";
import SuperButton from "../../../ui/features/SuperButton/SuperButton";

type FormikErrorType = {
    email: string
    password: string
    repeatedPassword: string
}

export const Register = () => {
    const dispatch = useAppDispatch();
    const {isSignedUp, registrationError} = useAppSelector(state => state.registration)
    const formik = useFormik({
        initialValues:{
            email: '',
            password: '',
            repeatedPassword: ''
        },
            validate: (values) => {
                const errors:Partial<FormikErrorType> = {};
                if (!values.email) {
                    errors.email = 'Email field should be filled';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                    errors.email = 'Invalid email address';
                }
                if(!values.password){
                    errors.password = 'Password field should be filled'
                }
                else if(values.password.length < 7) {
                    errors.password = 'Length should be more then 7'
                }
                if (!values.repeatedPassword) {
                    errors.repeatedPassword = 'Enter the password again'
                }
                else if (values.repeatedPassword !== values.password){
                    errors.repeatedPassword = 'The passwords entered in both passwords fields should match.'
                }
                return errors;
            },
            onSubmit: values => {
                dispatch(setSignUpThunk(values))
            }
    },
        )
    if (isSignedUp) {
        return <Navigate to={PATH.LOGIN}/>
    }
    return (<>
        <div>Register</div>
            <form onSubmit={formik.handleSubmit}>
               <div>
                   <SuperInputText type="text" {...formik.getFieldProps('email')}/>
                {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
               </div>
                <div>
                    <SuperInputText type="password" {...formik.getFieldProps('password')}/>
                    {formik.touched.password && formik.errors.password && <div>{formik.errors.password}</div>}
                </div>
               <div>
                   <SuperInputText type="password" {...formik.getFieldProps('repeatedPassword')}/>
                   {formik.touched.repeatedPassword && formik.errors.repeatedPassword && <div>{formik.errors.repeatedPassword}</div>}
               </div>
                <SuperButton type={'submit'}>
                    Sign Up
                </SuperButton>
            </form>
            {registrationError ? registrationError : ''}
        </>
    )
}