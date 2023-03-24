import {IsDateString, IsEnum, ValidateIf} from "class-validator"
import {SessionType} from "../../../../../enums"
import {isNotEmpty} from "@d-lab/common-kit"

export default class SessionFindNextRequest {
    @IsEnum(SessionType)
    public type: SessionType
    @ValidateIf((object, value) => isNotEmpty(value))
    @IsDateString(undefined, {message: "Invalid date format."})
    public date: string | null
}