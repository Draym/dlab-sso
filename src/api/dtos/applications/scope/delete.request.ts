import {IsEnum, IsInt} from "class-validator"
import {ApiModule} from "../../../../enums"

export default class ApplicationDeleteScopeRequest {
    @IsInt()
    applicationId: number
    @IsEnum(ApiModule)
    module: ApiModule
}