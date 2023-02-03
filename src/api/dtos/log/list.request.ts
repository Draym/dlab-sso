import {isNotEmpty, PageRequest} from "@d-lab/api-kit";
import {IsDateString, IsEnum, IsString, ValidateIf} from "class-validator"
import {LogEvent, LogScope} from "../../../enums"

export default class ListRequest extends PageRequest {
    @IsEnum(LogScope)
    @ValidateIf((object, value) => isNotEmpty(value))
    scope: LogScope | null
    @IsEnum(LogEvent)
    @ValidateIf((object, value) => isNotEmpty(value))
    event: LogEvent | null
    @IsString()
    @ValidateIf((object, value) => isNotEmpty(value))
    code: string | null
    @IsString()
    @ValidateIf((object, value) => isNotEmpty(value))
    message: string | null
    @IsDateString()
    @ValidateIf((object, value) => isNotEmpty(value))
    createdAfter: string | null
    @IsDateString()
    @ValidateIf((object, value) => isNotEmpty(value))
    createdBefore: string | null
}