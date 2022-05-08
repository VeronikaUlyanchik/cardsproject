import axios , {AxiosResponse} from "axios";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const profileAPI = {
    getMe () {
        return instance.post<GetMeResponseType>('auth/me', {})
    },
    updateMe (name: string, avatar: string) {
        return instance.put<PutMeResponseType>('auth/me', {name, avatar})
    }
}

export const registrationApi = {
    singUp(data:registrationDataType) {
        return instance.post<registrationDataType, AxiosResponse<ResponseRegistrationData>>("auth/register", data )
    }
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<GetMeResponseType<{userId: number}>>>('auth/login', data )
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
    data: D
}

export type PutMeResponseType = {
    updatedUser: GetMeResponseType
    error?: string
}

type ResponseRegistrationData = {
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

export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
}

export type ForgotDataType= {
    email:string
    info?: string
    error?: string
}