import {IsEnum, IsInt} from "class-validator"
import {ApiModule} from "../../../../enums"

export default class ApplicationAddScopeRequest {
    @IsInt()
    applicationId: number
    @IsEnum(ApiModule)
    module: ApiModule
}