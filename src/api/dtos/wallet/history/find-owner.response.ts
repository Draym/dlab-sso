export interface UserResponse {
    email: string | null
    uuid: string
}

export default interface FindWalletOwnerResponse {
    walletAddress: string
    user: UserResponse | null
}