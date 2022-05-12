import {AxiosResponse} from "axios";
import {instance} from "./Api";

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<GetMeResponseType<{userId: number}>>>('auth/login', data)
    },
    logout(){
        return instance.delete<ResponseType>('auth/me')
    },
    forgot(data: ForgotDataType){
        return instance.post<ForgotDataType, AxiosResponse<GetMeResponseType<{email: string}>>>('auth/forgot', data)
    }
}

//types
export type GetMeResponseType<D = {}> = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
    token: string
    tokenDeathTime: number
    data: D
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}

export type ForgotDataType<D = {}>= {
    email:string
    info?: string
    error?: string
    data?: D
}

export type ResponseType<D = {}> = {
    error: string
    info: string
    data: D
}

