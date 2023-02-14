import {IsDateString, IsEnum} from "class-validator"
import {SessionType} from "../../../../enums"

export default class SessionCreateRequest {
    @IsEnum(SessionType)
    public type: SessionType
    @IsDateString(undefined, {message: "Invalid date format."})
    public start: string
    @IsDateString(undefined, {message: "Invalid date format."})
    public end: string
}