import {IsBoolean, IsEmail, IsNotEmpty, IsString, ValidateIf} from "class-validator"
import {isNotEmpty} from "@d-lab/common-kit"

export default class LoginRequest {
    @IsEmail(undefined, {message: "Please input a valid email address."})
    public email: string

    @IsString()
    @IsNotEmpty({message: "Password should not be empty."})
    public password: string

    @IsBoolean()
    @ValidateIf((object, value) => isNotEmpty(value))
    public shortSession: boolean | null

}