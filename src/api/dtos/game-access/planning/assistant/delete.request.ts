import "reflect-metadata"
import {IsDateString, IsEnum, IsString} from "class-validator"
import {SessionType} from "../../../../../enums"

export default class AssistantDeleteSessionRequest {
    @IsString()
    public serviceUuid: string
    @IsEnum(SessionType)
    public type: SessionType
    @IsDateString(undefined, {message: "Invalid date format."})
    public from: string
    @IsDateString(undefined, {message: "Invalid date format."})
    public to: string
}