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

export type RefreshTokenRes = {
    accessToken: string
}

export type VerifyTokenRes = {
    account: { _id: string, email: string }
}

export type CheckTokenRes = {
    isValid: boolean
    account: {
        _id: string,
        email: string
    }
    expiresIn: number | null
}

export type ChangePasswordRes = {
    message: string
}
