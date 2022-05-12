import {AxiosResponse} from "axios";
import {instance} from "./Api";

export const profileAPI = {
    getMe() {
        return instance.post<GetMeResponseType>('auth/me')
    },
    updateMe(name: string) {
        return instance.put<PutMeResponseType>('auth/me', {name})
    },
    updatePassword(data: any){
        return instance.post<NewPasswordResponseType, AxiosResponse<GetMeResponseType>, any>(`auth/set-new-password`, data)
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

export type PutMeResponseType = {
    updatedUser: GetMeResponseType
    error?: string
}

export type NewPasswordResponseType <D = {}>= {
    info?: string
    error?: string
    data?: D
}

export type NewPasswordDataType = {
    password: string
    resetPasswordToken: string
}
