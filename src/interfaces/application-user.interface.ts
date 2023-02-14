import {Role} from "../enums"

export default interface ApplicationUser {
    id: number
    applicationId: number
    userId: number
    role: Role
    createdAt: Date
    updatedAt: Date
}