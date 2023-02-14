import {Role} from "../../../../enums"

export default interface UserRoleResponse {
    role: Role,
    userId: number,
    userEmail: string
}