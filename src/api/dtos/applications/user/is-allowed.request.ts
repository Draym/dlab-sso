import {IsBooleanString, IsEnum} from "class-validator"
import {Role} from "../../../../enums"

export default class AppUserIsAllowedRequest {
    @IsBooleanString()
    public strict: string
    @IsEnum(Role)
    public requiredRole: Role
}