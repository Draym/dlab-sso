import {IsEmail, IsNumberString} from "class-validator"

export default class EmailVerifyCodeRequest {
    @IsEmail(undefined, {message: "Please input a valid email address."})
    public email: string

    @IsNumberString()
    public verificationCode: string
}