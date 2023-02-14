import {IsEmail} from "class-validator"

export default class EmailSendCodeRequest {
    @IsEmail(undefined, {message: "Please input a valid email address."})
    public email: string
}