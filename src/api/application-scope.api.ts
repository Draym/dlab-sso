import {AuthBodyRequest} from "@d-lab/api-kit"
import {ApplicationAddScopeRequest, ApplicationDeleteScopeRequest} from "./dtos/applications"

export default interface ApplicationScopeApi {
    addScope(req: AuthBodyRequest<ApplicationAddScopeRequest>): Promise<void>
    deleteScope(req: AuthBodyRequest<ApplicationDeleteScopeRequest>): Promise<void>
}