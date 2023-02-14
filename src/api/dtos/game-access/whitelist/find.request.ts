import {IsEmail} from "class-validator"

export default class WhitelistFindRequest {
    @IsEmail(undefined, {message: "Please input a valid email address."})
    public email: string
}