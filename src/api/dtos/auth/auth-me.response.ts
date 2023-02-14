import {Role} from "../../../enums"

export interface RoleResponse {
    role: Role
    isStaff: boolean
}

export interface AccessDetailResponse<T> {
    authorized: boolean
    attributes: T
}

export interface WhitelistAttributesResponse{
    isWhitelisted: boolean
    isStaff: boolean
    isOpen: boolean
}

export interface EarlyAccessAttributesResponse {
    isPBETester: boolean
    isStaff: boolean
    isOpen: boolean
}

export interface AccessResponse {
    whitelist: AccessDetailResponse<WhitelistAttributesResponse>
    earlyAccess: AccessDetailResponse<EarlyAccessAttributesResponse>
}

export interface WalletsResponse {
    ethWallet: string | undefined
}

export default interface AuthMeResponse {
    id: number
    uuid: string
    email: string | null
    role: RoleResponse
    wallets: WalletsResponse
    createdAt: Date
    updatedAt: Date
}