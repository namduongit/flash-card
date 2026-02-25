import { WordRes } from "./word-response";

export type LessonRes = {
    _id: string,
    title: string,
    description: string
}

export type DetailLessonRes = LessonRes & {
    words: WordRes[]
}

export type DeleteLessonRes = {
    _id: string,
    isDeleted: boolean
}