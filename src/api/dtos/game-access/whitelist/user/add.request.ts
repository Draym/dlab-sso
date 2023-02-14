import {IsEmail} from "class-validator"

export default class WhitelistUserAddRequest {
    @IsEmail(undefined, {each: true, message: "Please input only valid email addresses."})
    emails: string[]
}