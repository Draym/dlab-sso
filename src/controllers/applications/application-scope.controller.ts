import {applicationScopeService} from "../../services"
import {ApplicationAddScopeRequest, ApplicationDeleteScopeRequest} from "../../api/dtos/applications"
import {AuthBodyRequest} from "@d-lab/api-kit"
import RequireAppOwner from "../../utils/decorators/require-app-owner.decorator"

export default class ApplicationScopeController {

    @RequireAppOwner
    async addScope(req: AuthBodyRequest<ApplicationAddScopeRequest>): Promise<void> {
        const payload = req.body
        await applicationScopeService.addScope(payload.applicationId, payload.module)
    }

    @RequireAppOwner
    async deleteScope(req: AuthBodyRequest<ApplicationDeleteScopeRequest>): Promise<void> {
        const payload = req.body
        await applicationScopeService.deleteScope(payload.applicationId, payload.module)
    }
}