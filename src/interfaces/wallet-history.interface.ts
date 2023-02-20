import {WalletType} from "../enums"

export default interface WalletHistory {
    id: number
    type: WalletType
    address: string
    userId: number
    bindAt: Date
    unbindAt: Date | null
}