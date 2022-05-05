import axios, {AxiosResponse} from "axios";

let plug;

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

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

export const registrationApi = {
    singUp(data:registrationDataType) {
       return instance.post<any, AxiosResponse<ResponseRegistrationData>, registrationDataType>("/auth/register", data )
    }
}
export default plug