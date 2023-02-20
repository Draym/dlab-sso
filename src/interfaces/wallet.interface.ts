import {WalletType} from "../enums"

export default interface Wallet {
    id: number
    type: WalletType
    address: string
    userId: number
    createdAt: Date
    updatedAt: Date
}