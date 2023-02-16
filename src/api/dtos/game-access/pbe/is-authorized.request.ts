import {IsEmail} from "class-validator"

export default class PbeIsAuthorizedRequest {
    @IsEmail(undefined, {message: "Please input a valid email address."})
    public email: string
}