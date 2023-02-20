export interface WalletUserDto {
    email: string | null
    uuid: string
}

export default interface FindWalletOwnerResponse {
    walletAddress: string
    user: WalletUserDto | null
}