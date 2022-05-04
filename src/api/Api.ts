import axios from "axios";

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