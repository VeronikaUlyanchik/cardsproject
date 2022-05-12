import {AxiosResponse} from "axios";
import {instance} from "./Api";

export const packsAPI = {
    getCardsPack({
                     packName,
                     min,
                     max,
                     sortPacks,
                     page = 1,
                     pageCount = 7,
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
        return instance.put<AxiosResponse<CardsAndPacksResponseType>>('/cards/pack', {
            cardsPack: {
                _id: id,
                name: title
            }
        })
    },

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
