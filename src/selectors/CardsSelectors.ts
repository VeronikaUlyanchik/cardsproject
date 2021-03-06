import {AppRootStateType} from "../bll-redux/store";
import {CardType} from "../api/CardsAPI";


export const selectCards = (state: AppRootStateType, packId: string): CardType[] => {
    return state.cards.cards.filter(cards => cards.cardsPack_id === packId)
}

export const selectAllCards = (state: AppRootStateType): CardType[] => {
    return state.cards.cards
}

export const selectCardItem = (state: AppRootStateType, cardId: string): CardType => {
    return state.cards.cards.filter(item => item._id === cardId)[0]
}

export const selectCardQuestion = (state: AppRootStateType, cardId: string): string => {
    return selectCardItem(state, cardId).question
}

export const selectCardAnswer = (state: AppRootStateType, cardId: string): string => {
    return selectCardItem(state, cardId).answer
}

export const selectCardUpdatedTime = (state: AppRootStateType, cardId: string): string => {
    return selectCardItem(state, cardId).updated
}

export const selectCardGrade = (state: AppRootStateType, cardId: string): number => {
    return selectCardItem(state, cardId).grade
}

export const selectTotalCountCards = (state: AppRootStateType): number => {
    return state.cards.totalCountCards
}

export const selectPackPerPage = (state: AppRootStateType): number => {
    return state.cards.packPerPage
}

export const selectCardsPageCount = (state: AppRootStateType): number => {
    return state.cards.pageCount
}

export const selectCardUserId = (state: AppRootStateType, cardId: string): string => {
    return selectCardItem(state, cardId).user_id
}

export const selectCardPackID = (state: AppRootStateType, cardId: string): string => {
    return selectCardItem(state, cardId).cardsPack_id
}