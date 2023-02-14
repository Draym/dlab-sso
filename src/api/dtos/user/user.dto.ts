import {Role} from "../../../enums"

export default interface UserDto {
    id: number
    email: string | null
    uuid: string
    role: Role | undefined
    createdAt: Date
    updatedAt: Date
}