import axios , {AxiosResponse} from "axios";
// http://localhost:7542/2.0/
//https://neko-back.herokuapp.com/2.0
export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const profileAPI = {
    getMe () {
        return instance.post<GetMeResponseType>('auth/me')
    },
    updateMe (name: string, avatar: string) {
        return instance.put<PutMeResponseType>('auth/me', {name, avatar})
    }
}

export const cardsAPI = {
    getAllCards (page:number) {
        return instance.get<any>(`/cards/pack/?packName=english&min=3&max=9&sortPacks=0updated&page=${page}&pageCount=4`)
    },
}

export const registrationApi = {
    singUp(data:registrationDataType) {
        return instance.post<any, AxiosResponse<ResponseRegistrationData & RejectedType>, registrationDataType>("/auth/register", data )
    }
}

export type RejectedType = any

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{userId: number}>>>('auth/login', data )
    },
    // me() {
    //     return instance.get<ResponseType<MeResponceType>>('auth/me')
    // },
    // logout(){
    //     return instance.delete<ResponseType>('auth/login')
    // }
}

//types
export type GetMeResponseType = {
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
}

export type PutMeResponseType = {
    updatedUser: GetMeResponseType
    error?: string
}

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

export type MeResponceType = {
    id: number,
    email: string,
    login: string
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
}

export type ResponseType<D = {}> = {
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