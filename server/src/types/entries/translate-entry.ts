import { WordType } from "../enums"

export type TranslateEntry = {
    word: string,
    type: WordType,
    phonetic: string,
    meaning: string | string[]
}