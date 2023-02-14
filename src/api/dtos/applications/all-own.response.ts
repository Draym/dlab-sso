import {ApiAccessRequire, ApiAccessType, ApiModule} from "../../enums"

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