import {ApiAccessRequire, ApiAccessType, ApiModule} from "../../enums"
import {ArrayUnique, IsArray, IsEnum, IsString} from "class-validator"

export default class ApplicationCreateRequest {
    @IsString()
    name: string
    @IsString()
    description: string
    @IsEnum(ApiAccessType)
    type: ApiAccessType
    @IsEnum(ApiAccessRequire)
    accessType: ApiAccessRequire
    @IsArray()
    @ArrayUnique()
    @IsEnum(ApiModule, {each: true})
    modules: ApiModule[]
}