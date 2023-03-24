import {Role} from "../../../../enums"

export default interface AppUserCreateRequest {
    applicationId: number
    userId: number
    role: Role
}