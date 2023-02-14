import {IsEmail, IsNumberString, IsUUID, ValidateIf} from "class-validator"
import {isNotEmpty} from "@d-lab/api-kit"

export default class UserFindRequest {
    @IsEmail()
    @ValidateIf((object, value) => isNotEmpty(value))
    email: string | undefined

    @IsNumberString()
    @ValidateIf((object, value) => isNotEmpty(value))
    userId: string | undefined

    @IsUUID()
    @ValidateIf((object, value) => isNotEmpty(value))
    userUuid: string | undefined
}