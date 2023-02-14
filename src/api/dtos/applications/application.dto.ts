import {ApiAccessRequire, ApiAccessType} from "../../../enums"

export default interface ApplicationDto {
    id: number,
    ownerId: number,
    name: string,
    description: string,
    type: ApiAccessType,
    accessType: ApiAccessRequire,
    createdAt: Date,
    updatedAt: Date
}