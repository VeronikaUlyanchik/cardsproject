import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

export const profileAPI = {
    getMe() {
        return instance.post<GetMeResponseType>('auth/me')
    },
    updateMe(name: string) {
        return instance.put<PutMeResponseType>('auth/me', {name})
    }
}

export const registrationApi = {
    singUp(data:registrationDataType) {
        return instance.post<any, AxiosResponse<ResponseRegistrationData & RejectedType>, registrationDataType>("/auth/register", data )
    }
}

export type RejectedType = any

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId: number }>>>('auth/login', data)
    },
}

export const packsAPI = {
    getCardsPack({
                     packName,
                     min,
                     max,
                     sortPacks,
                     page = 1,
                     pageCount = 10,
                     user_id,
                 }: CardsPackParamsType) {
        return instance.get<GetCardsPackResponse>(`/cards/pack`, {
            params: {
                packName,
                min,
                max,
                sortPacks,
                page,
                pageCount,
                user_id,
            }
        })
    },
    createCardsPack(title: string) {
        return instance.post<AxiosResponse<CardsAndPacksResponseType>>('/cards/pack', {cardsPack: {name: title}})
    },
    deleteCardsPack(id: string) {
        return instance.delete<AxiosResponse<CardsAndPacksResponseType>>('/cards/pack', {params: {id}})
    },
    updateCardsPack(id: string, title: string) {
        return instance.put<AxiosResponse<CardsAndPacksResponseType>>('/cards/pack', {cardsPack: {_id: id, name: title}})
    },

}

export const cardsAPI = {
    getCards({
                 cardAnswer,
                 cardQuestion,
                 cardsPack_id,
                 min,
                 max,
                 sortCards,
                 page,
                 pageCount = 10,
             }: GetCardsParamsType) {
        return instance.get<GetCardsResponseType>('/cards/card', {params: {
                cardAnswer,
                cardQuestion,
                cardsPack_id,
                min,
                max,
                sortCards,
                page,
                pageCount,
            }})
    },
    createCard(card: CardModelRequestType){
        return instance.post<CardsAndPacksResponseType>('/cards/card', card)
    },
    deleteCard(id: string){
        return instance.delete('/cards/card', {params: {id} })
    },
    updateCard(card: CardModelRequestType){
        return instance.put<CardsAndPacksResponseType>('/cards/card', card)
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
    token: string
    tokenDeathTime: number
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

export type CardsPackParamsType = {
    packName?: string // не обязательно
    min?: number // не обязательно
    max?: number // не обязательно
    sortPacks?: string // не обязательно
    page?: number // не обязательно
    pageCount?: number // не обязательно

    user_id?: string// не обязательно
}

export type GetCardsPackResponse = {
    cardPacks: CardsPackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export type CardsPackType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
}

export type CardsAndPacksResponseType = {}

export type CreateCardsPackType = {
    name?: string
    deckCover?: string
    private?: boolean
}

export type GetCardsParamsType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}

export type GetCardsResponseType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}

export type CardModelRequestType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
}