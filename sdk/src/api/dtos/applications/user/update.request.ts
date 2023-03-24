import {Role} from "../../../../enums"

export default interface AppUserUpdateRequest {
    applicationId: number
    userId: number
    role: Role
}