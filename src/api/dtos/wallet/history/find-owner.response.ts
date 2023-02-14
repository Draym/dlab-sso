export interface UserResponse {
    email: string
    identifier: string
}

export default interface FindWalletOwnerResponse {
    walletAddress: string
    user: UserResponse | null
}