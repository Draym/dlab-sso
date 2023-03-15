import AppUserDto from "./user/app-user.dto"
import {ApiAccessRequire, ApiAccessType} from "@d-lab/api-kit"

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