import {IsEnum, ValidateIf} from "class-validator"
import {isNotEmpty} from "../../../../utils/validators/checks"
import {SessionType} from "../../../../enums"

export default class SessionAllRequest {
    @IsEnum(SessionType)
    @ValidateIf((object, value) => isNotEmpty(value))
    public type: SessionType | undefined
}