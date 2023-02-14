import {IsDateString, IsEnum, ValidateIf} from "class-validator"
import {isNotEmpty} from "../../../utils/validators/checks"
import {SessionType} from "../../../enums"

export default class PlanningGetRequest {
    @IsEnum(SessionType)
    @ValidateIf((object, value) => isNotEmpty(value))
    public type: SessionType | undefined
    @IsDateString(undefined, {message: "Invalid date format."})
    @ValidateIf((object, value) => isNotEmpty(value))
    public after: string | undefined
}