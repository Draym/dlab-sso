import {IsDateString, IsEnum, IsString} from "class-validator"
import {SessionType} from "../../../../../enums"

export default class SessionCreateRequest {
    @IsString()
    public serviceId: number
    @IsEnum(SessionType)
    public type: SessionType
    @IsDateString(undefined, {message: "Invalid date format."})
    public start: string
    @IsDateString(undefined, {message: "Invalid date format."})
    public end: string
}