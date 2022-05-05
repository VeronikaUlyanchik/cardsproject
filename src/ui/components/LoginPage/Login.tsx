import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import {useFormik} from "formik";
import SuperButton from "../../features/SuperButton/SuperButton";
import SuperCheckbox from "../../features/SuperCheckbox/SuperCheckbox";
import {Navigate} from "react-router-dom";
import SuperInputText from "../../features/SuperInputText/SuperInputText";
import {fetchLogged} from "../../../bll-redux/reducers/AuthReducer";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
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
            } else if (values.password.length < 3) {
                errors.password = 'Small password';
            }
            return errors;
        },
        onSubmit: values => {
            console.log(values)
            dispatch(fetchLogged(values))
            formik.resetForm();
        },
    })

    if (isLoggedIn) {
        console.log(isLoggedIn)
        return <Navigate to={'/profile'}/>
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div>Login <SuperInputText {...formik.getFieldProps("email")}/></div>
                {formik.touched.password && formik.errors.email &&
                    <div style={{color: 'red'}}>{formik.errors.email}</div>}
                <div>Password <SuperInputText  {...formik.getFieldProps('password')}/></div>
                {formik.touched.password && formik.errors.password ?
                    <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                <div><SuperCheckbox {...formik.getFieldProps("rememberMe")}/></div>
                <div><SuperButton type={'submit'} name={'Sign Up'}/></div>
            </form>
        </div>
    )
}