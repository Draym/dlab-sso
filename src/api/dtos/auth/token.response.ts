interface User {
    id: number
    uuid: string
    createdAt: Date
    updatedAt: Date
}

export default interface TokenResponse {
    token: string
    refreshToken: string
    expireAt: Date
    user: User
}