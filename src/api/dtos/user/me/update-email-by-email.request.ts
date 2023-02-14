import {IsEmail, IsInt} from "class-validator"

export default class MeEmailUpdateByEmailRequest {
    @IsEmail(undefined, {message: "Please input a valid email address."})
    public oldEmail: string

    @IsInt()
    public oldEmailVerificationCode: number

    @IsEmail(undefined, {message: "Please input a valid email address."})
    public newEmail: string

    @IsInt()
    public newEmailVerificationCode: number
}