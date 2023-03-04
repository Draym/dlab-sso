import {Role} from "../../../../enums"

export default interface AppUserDto {
    id: number
    applicationId: number
    userId: number
    role: Role
    createdAt: Date
    updatedAt: Date
}