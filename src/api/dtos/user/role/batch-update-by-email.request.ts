import {Role} from "../../../../enums"
import {IsEmail, IsEnum, IsNotEmpty} from "class-validator"

export default class UserRoleBatchUpdateByEmailRequest {
    @IsEmail(undefined, {each: true})
    userEmails: string[]

    @IsEnum(Role)
    @IsNotEmpty({message: "Role should not be empty."})
    role: Role
}