import {AxiosResponse} from "axios";
import {instance} from "./Api";

export const registrationApi = {
    singUp(data: registrationDataType) {
        return instance.post<RejectedType, AxiosResponse<ResponseRegistrationData>, registrationDataType>("/auth/register", data )
    }
}

export type RejectedType = any

//types
export type ResponseRegistrationData = {
    addedUser: {
        created: string
        email: string
        isAdmin: boolean
        name: string
        publicCardPacksCount: number
        rememberMe: boolean
        updated: string
        verified: boolean
        __v: number
        _id: string
    },
    errors?: string
}

export type registrationDataType = {
    email: string
    password: string
}


