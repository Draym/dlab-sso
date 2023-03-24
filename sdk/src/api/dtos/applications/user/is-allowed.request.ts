import {Role} from "../../../../enums"

export default interface AppUserIsAllowedRequest {
    userId?: string
    strict: string
    requiredRole: Role
}