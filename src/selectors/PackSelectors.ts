import {AppRootStateType} from "../bll-redux/store";
import {CardsPackType} from "../api/PacksAPI";

export const selectAllCardPacks = (state: AppRootStateType): CardsPackType[] => {
    return state.packList.packList
}

export const selectMyCardPacks = (state: AppRootStateType, userId: string): CardsPackType[] => {
    return state.packList.packList.filter(p => p.user_id === userId)
}

export const selectPack = (state: AppRootStateType, packId: string):CardsPackType => {
    return state.packList.packList?.filter(p => p._id === packId)[0]
}

export const selectUserPackName = (state: AppRootStateType, packId: string):string => {
    return selectPack(state, packId).name
}

export const selectPackId = (state: AppRootStateType, packId: string):string => {
    return selectPack(state, packId)._id
}

export const selectUserPackId = (state: AppRootStateType, packId: string):string => {
    return selectPack(state, packId).user_id
}

export const selectCardsCount = (state: AppRootStateType, packId: string):number => {
    return selectPack(state, packId).cardsCount
}

export const selectUpdatedTime = (state: AppRootStateType, packId: string) => {
    return selectPack(state, packId).updated
}

export const selectCreatedTime = (state: AppRootStateType, packId: string) => {
    return selectPack(state, packId).created
}

export const selectTotalCountPacks = (state: AppRootStateType):number=> {
    return state.packList.totalCountPacks
}

export const selectPackPerPage = (state: AppRootStateType):number=> {
    return state.packList.packPerPage
}

export const selectPackName = (state: AppRootStateType):string=> {
    return state.packList.packName
}

export const selectCurrentPage = (state: AppRootStateType):number=> {
    return state.packList.page
}
