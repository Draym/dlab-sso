import {WalletType} from "../enums"

export default interface Wallet {
    id: number
    type: WalletType
    address: string
    userUuid: string
    createdAt: Date
    updatedAt: Date
}