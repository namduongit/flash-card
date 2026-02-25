export type RegisterRes = {
    account: {
        _id: string,
        email: string
    },
    accessToken: string
}

export type LoginRes = {
    account: {
        _id: string,
        email: string
    },
    accessToken: string
}

export type ValidStateRes = {
    account: {
        _id: string,
        email: string
    },
    expiresIn: number,
    isValid: boolean
}