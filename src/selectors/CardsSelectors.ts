import {AppRootStateType} from "../bll-redux/store";
import {CardType} from "../api/CardsAPI";


export const selectCards = (state: AppRootStateType, packId: string):CardType[] => {
    return state.cards.cards.filter(cards => cards.cardsPack_id === packId)
}

export const selectCardItem = (state: AppRootStateType, cardId: string):CardType => {
    return state.cards.cards.filter(item => item._id === cardId)[0]
}

export const selectCardQuestion = (state: AppRootStateType, cardId: string):string => {
    return selectCardItem(state, cardId).question
}

export const selectCardAnswer = (state: AppRootStateType, cardId: string):string => {
    return selectCardItem(state, cardId).answer
}

export const selectCardUpdatedTime = (state: AppRootStateType, cardId: string):string => {
    return selectCardItem(state, cardId).updated
}

export const selectCardGrade = (state: AppRootStateType, cardId: string):number => {
    return selectCardItem(state, cardId).grade
}