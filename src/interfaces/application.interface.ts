import {ApiAccessRequire, ApiAccessType} from "@d-lab/api-kit"

export default interface Application {
    id: number
    ownerId: number
    name: string
    description: string
    apiKey: string
    type: ApiAccessType
    accessType: ApiAccessRequire
    createdAt: Date
    updatedAt: Date
}