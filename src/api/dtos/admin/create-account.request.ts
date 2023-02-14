import {IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MaxLength, MinLength, ValidateIf} from "class-validator"
import {Role} from "../../../enums"
import {isNotEmpty} from "@d-lab/api-kit"
import Password from "../../../utils/validators/password"

export default class AdminCreateAccountRequest {
    @IsEmail(undefined, {message: "Please input a valid email address."})
    public email: string

    @IsString()
    @MinLength(8, {message: "Password should contains at least 8 characters."})
    @MaxLength(25, {message: "Password should contains at maximum 25 characters."})
    @Matches(Password.getAuthorizedCharacters(), {message: 'Password contains unauthorized characters.'})
    public password: string

    @IsString()
    @IsNotEmpty({message: "Reason should not be empty."})
    public reason: string

    @IsEnum(Role)
    @ValidateIf((object, value) => isNotEmpty(value))
    public role: Role | undefined
}