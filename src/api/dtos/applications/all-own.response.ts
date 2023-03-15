import {ApiModule} from "../../../enums"
import {ApiAccessRequire, ApiAccessType} from "@d-lab/api-kit"

export interface ApplicationResponse {
    id: number,
    ownerId: number,
    name: string,
    description: string,
    type: ApiAccessType,
    accessType: ApiAccessRequire,
    modules: ApiModule[],
    createdAt: Date,
    updatedAt: Date
}

export default interface ApplicationAllOwnResponse {
    applications: ApplicationResponse[]
}