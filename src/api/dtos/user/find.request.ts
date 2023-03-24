import {IsEmail, IsNumberString, IsUUID, ValidateIf} from "class-validator"
import {isNotEmpty} from "@d-lab/common-kit"

export default class UserFindRequest {
    @IsEmail()
    @ValidateIf((object, value) => isNotEmpty(value))
    email: string | undefined

    @IsNumberString()
    @ValidateIf((object, value) => isNotEmpty(value))
    id: string | undefined

    @IsUUID()
    @ValidateIf((object, value) => isNotEmpty(value))
    uuid: string | undefined
}