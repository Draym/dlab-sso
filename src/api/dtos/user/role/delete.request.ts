import {Role} from "../../../../enums"
import {IsEnum, IsInt, IsNotEmpty, Min} from "class-validator"

export default class UserRoleDeleteRequest {
    @IsInt()
    @Min(1)
    userId : number

    @IsEnum(Role)
    @IsNotEmpty({message: "Role should not be empty."})
    role: Role
}