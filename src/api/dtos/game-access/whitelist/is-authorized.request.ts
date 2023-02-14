import {IsEmail} from "class-validator"

export default class WhitelistIsAuthorizedRequest {
    @IsEmail(undefined, {message: "Please input a valid email address."})
    public email: string
}