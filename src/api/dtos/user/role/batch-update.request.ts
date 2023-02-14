import {Role} from "../../../../enums"
import {IsEnum, IsInt, IsNotEmpty, Min} from "class-validator"

export default class UserRoleBatchUpdateRequest {
    @IsInt({each: true})
    @Min(1, {each: true})
    userIds: number[]

    @IsEnum(Role)
    @IsNotEmpty({message: "Role should not be empty."})
    role: Role
}