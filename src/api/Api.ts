import axios, {AxiosResponse} from "axios";

let plug;

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

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
export default plug