import axios from "axios";
import {instance} from "./Api";

export const cardsAPI = {
    getCards({
                 cardAnswer,
                 cardQuestion,
                 cardsPack_id,
                 min,
                 max,
                 sortCards,
                 page,
                 pageCount = 7,
             }: GetCardsParamsType) {
        return instance.get<GetCardsResponseType>('/cards/card', {
            params: {
                cardAnswer,
                cardQuestion,
                cardsPack_id,
                min,
                max,
                sortCards,
                page,
                pageCount,
            }
        })
    },
    createCard(card: CardModelRequestType) {
        return instance.post<CardsAndPacksResponseType>('/cards/card', {card})
    },
    deleteCard(id: string) {
        return instance.delete('/cards/card', {params: {id}})
    },
    updateCard(card: CardModelRequestType) {
        return instance.put<CardsAndPacksResponseType>('/cards/card', card)
    },
}

//types
export type CardsAndPacksResponseType = {}

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
