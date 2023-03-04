import {IsEnum, IsNumber} from "class-validator"
import {Role} from "../../../../enums"

export default class AppUserUpdateRequest {
    @IsNumber()
    public applicationId: number
    @IsNumber()
    public userId: number
    @IsEnum(Role)
    public role: Role
}