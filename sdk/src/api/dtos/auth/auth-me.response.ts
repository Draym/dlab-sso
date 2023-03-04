import {Role, WalletType} from "../../../enums"

export interface RoleDto {
    role: Role
    isStaff: boolean
}

export interface WalletDto {
    address: string
    type: WalletType
}

export default interface AuthMeResponse {
    id: number
    uuid: string
    email: string | null
    role: RoleDto
    wallets: WalletDto[]
    createdAt: Date
    updatedAt: Date
}