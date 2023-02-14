import {Role} from "../enums";

export default interface UserRole {
    id: number
    userUuid: string
    role: Role
}
