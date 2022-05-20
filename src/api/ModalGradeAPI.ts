import {instance} from "./Api";

export const modalGradeAPI = {
    updateGrade(data: ModalGradeRequestType) {
        return instance.put<UpdatedGradeType>(`cards/grade`, {...data})
    }
}

//types

export type ModalGradeRequestType = {
    grade: number
    card_id: string
}

export type UpdatedGradeType = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}