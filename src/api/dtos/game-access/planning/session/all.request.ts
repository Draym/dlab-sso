import {IsDateString, IsEnum, ValidateIf} from "class-validator"
import {SessionType} from "../../../../../enums"
import {isNotEmpty} from "@d-lab/common-kit"

export default class SessionAllRequest {
    @IsEnum(SessionType)
    @ValidateIf((object, value) => isNotEmpty(value))
    public type: SessionType | undefined
    @IsDateString(undefined, {message: "Invalid date format."})
    @ValidateIf((object, value) => isNotEmpty(value))
    public dateAfter: string | undefined
    @IsDateString(undefined, {message: "Invalid date format."})
    @ValidateIf((object, value) => isNotEmpty(value))
    public dateBefore: string | undefined
}