import {WalletType} from "../enums"

export default interface WalletHistory {
    id: number
    type: WalletType
    address: string
    userUuid: string
    bindAt: Date
    unbindAt: Date | null
}