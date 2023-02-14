import {IsDateString, IsEnum} from "class-validator"
import {SessionType} from "../../../../enums"

export default class SessionFindRequest {
    @IsEnum(SessionType)
    public type: SessionType
    @IsDateString(undefined, {message: "Invalid date format."})
    public date: string
}