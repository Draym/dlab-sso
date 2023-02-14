import "reflect-metadata"
import {IsBoolean, IsEnum, IsISO8601, ValidateNested} from "class-validator"
import {SessionType} from "../../../../enums"
import {Type} from "class-transformer"
import TimeRequest from "./time.request"
import DayPickerRequest from "./day-picker.request"

export default class AssistantCreateSessionRequest {
    @IsEnum(SessionType)
    public type: SessionType
    @ValidateNested({message: "Invalid Time format"})
    @Type(() => TimeRequest)
    public startTime: TimeRequest
    @ValidateNested({message: "Invalid Time format"})
    @Type(() => TimeRequest)
    public endTime: TimeRequest
    @IsISO8601()
    public from: string
    @IsISO8601()
    public to: string
    @ValidateNested({message: "Invalid DayPicker format"})
    @Type(() => DayPickerRequest)
    public dayPicker: DayPickerRequest
    @IsBoolean()
    public ignoreConflicts: boolean
}