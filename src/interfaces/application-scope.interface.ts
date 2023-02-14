import {ApiModule} from "../enums"

export default interface ApplicationScope {
    id: number
    applicationId: number
    module: ApiModule
    createdAt: Date
    updatedAt: Date
}