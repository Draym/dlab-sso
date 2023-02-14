import {IsEmail, IsInt} from "class-validator"

export default class MeEmailUpdateRequest {
    @IsEmail(undefined, {message: "Please input a valid email address."})
    public email: string

    @IsInt()
    public verificationCode: number
}