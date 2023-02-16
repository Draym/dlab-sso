import {IsDateString, IsEmail, IsNumberString, IsUUID, ValidateIf} from "class-validator"
import {isNotEmpty, PageRequest} from "@d-lab/api-kit"

export default class UserAllRequest extends PageRequest {
    @IsEmail(undefined, {each: true})
    @ValidateIf((object, value) => isNotEmpty(value))
    emails: string[] | undefined

    @IsNumberString(undefined, {each: true})
    @ValidateIf((object, value) => isNotEmpty(value))
    userIds: string[] | undefined

    @IsUUID(undefined, {each: true})
    @ValidateIf((object, value) => isNotEmpty(value))
    userUuids: string[] | undefined

    @IsDateString(undefined, {message: "Invalid date format."})
    @ValidateIf((object, value) => isNotEmpty(value))
    registeredAfter: string | null
    
    @IsDateString(undefined, {message: "Invalid date format."})
    @ValidateIf((object, value) => isNotEmpty(value))
    registeredBefore: string | null
}