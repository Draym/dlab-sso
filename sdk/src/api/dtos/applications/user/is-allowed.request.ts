import {IsBooleanString, IsEnum, IsNumberString} from "class-validator"
import {SkipNull} from "@d-lab/api-kit"
import {Role} from "../../../../enums"

export default class AppUserIsAllowedRequest {
    @IsNumberString()
    @SkipNull()
    userId?: string
    @IsBooleanString()
    public strict: string
    @IsEnum(Role)
    public requiredRole: Role
}