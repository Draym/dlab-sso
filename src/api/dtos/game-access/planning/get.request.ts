import {IsDateString, IsEnum, ValidateIf} from "class-validator"
import {SessionType} from "../../../../enums"
import {isNotEmpty} from "@d-lab/common-kit"

export default class PlanningGetRequest {
    @IsEnum(SessionType)
    @ValidateIf((object, value) => isNotEmpty(value))
    public type: SessionType | undefined
    @IsDateString(undefined, {message: "Invalid date format."})
    @ValidateIf((object, value) => isNotEmpty(value))
    public after: string | undefined
}