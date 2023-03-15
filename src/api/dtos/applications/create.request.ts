import {ApiModule} from "../../../enums"
import {ArrayUnique, IsArray, IsEnum, IsString} from "class-validator"
import {ApiAccessRequire, ApiAccessType} from "@d-lab/api-kit"

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