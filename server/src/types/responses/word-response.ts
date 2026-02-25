export type WordRes = {
    _id: string,
    english: string,
    wordType: string,
    vietnamese: string,
    example: string
}

export type DeleteWordRes = {
    _id: string,
    isDeleted: boolean
}
