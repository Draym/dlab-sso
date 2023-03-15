import {IsBooleanString, IsEnum, IsNumberString} from "class-validator"
import {Role} from "../../../../enums"
import {SkipNull} from "@d-lab/api-kit"

export default class AppUserIsAllowedRequest {
    @IsNumberString()
    @SkipNull()
    userId?: string
    @IsBooleanString()
    public strict: string
    @IsEnum(Role)
    public requiredRole: Role
}