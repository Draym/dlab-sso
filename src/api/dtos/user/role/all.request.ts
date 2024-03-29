import {IsEnum, ValidateIf} from "class-validator"
import {Role} from "../../../../enums"
import {isNotEmpty} from "@d-lab/common-kit"

export default class UserRoleAllRequest {
    @IsEnum(Role)
    @ValidateIf((object, value) => isNotEmpty(value))
    public role: Role | undefined
}