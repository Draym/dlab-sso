import {ApiAccessRequire, ApiAccessType} from "../../../enums"
import AppUserDto from "./user/app-user.dto"

export default interface ApplicationDto {
    id: number,
    ownerId: number,
    name: string,
    description: string,
    type: ApiAccessType,
    accessType: ApiAccessRequire,
    users?: AppUserDto[]
    createdAt: Date,
    updatedAt: Date
}