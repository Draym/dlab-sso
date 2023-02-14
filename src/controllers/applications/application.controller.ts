import {applicationScopeService, applicationService} from "../../services"
import {
    ApiKeyResponse,
    ApplicationAllOwnResponse,
    ApplicationAllResponse,
    ApplicationCreateRequest,
    ApplicationDeleteRequest,
    ApplicationIsOwnerResponse,
    ApplicationNewApiKeyRequest,
    ApplicationDto
} from "../../api/dtos/applications"
import {ApplicationScopeModel} from "../../models"
import Errors from "../../utils/errors/Errors"
import {AuthBodyRequest, AuthRequest, groupBy, isNull, throwIfNull} from "@d-lab/api-kit"

export default class ApplicationController {
    async allByOwner(req: AuthRequest): Promise<ApplicationAllOwnResponse> {
        const caller = req.caller
        const applications = await applicationService.findAllByOwner(caller.id)
        const appIds = applications.map(app => app.id)

        const groupScopes = groupBy(await applicationScopeService.findAllByAppIds(appIds), "applicationId")

        return {
            applications: applications.map(app => {
                const scopes: ApplicationScopeModel[] | null = groupScopes[app.id]
                return {
                    id: app.id,
                    ownerId: app.ownerId,
                    name: app.name,
                    description: app.description,
                    type: app.type,
                    accessType: app.accessType,
                    modules: isNull(scopes) ? [] : scopes!.map(scope => scope.module),
                    createdAt: app.createdAt,
                    updatedAt: app.updatedAt
                }
            })
        }
    }

    async all(_: AuthRequest): Promise<ApplicationAllResponse> {
        const applications = await applicationService.getAll()
        return {applications}
    }

    async details(req: AuthRequest): Promise<ApplicationDto> {
        const apiKey = req.auth.apiKey
        throwIfNull(apiKey, Errors.REQUIRE_ApiKey())
        return await applicationService.getById(apiKey!.appId)
    }

    async isOwner(req: AuthRequest): Promise<ApplicationIsOwnerResponse> {
        const appKey = req.auth.apiKey
        throwIfNull(appKey, Errors.REQUIRE_ApiKey())
        const token = req.auth.token
        throwIfNull(token, Errors.REQUIRE_Token())

        return {
            owner: appKey!.ownerId === token!.userId
        }
    }

    async create(req: AuthBodyRequest<ApplicationCreateRequest>): Promise<ApiKeyResponse> {
        const caller = req.caller
        const payload = req.body
        const apiKey = await applicationService.create(caller.id, payload.name, payload.description, payload.type, payload.accessType, payload.modules)

        return {apiKey}
    }

    async delete(req: AuthBodyRequest<ApplicationDeleteRequest>): Promise<void> {
        const caller = req.caller
        const payload = req.body
        await applicationService.delete(payload.applicationId, caller.id)
    }

    async requestNewApiKey(req: AuthBodyRequest<ApplicationNewApiKeyRequest>): Promise<ApiKeyResponse> {
        const caller = req.caller
        const payload = req.body
        const apiKey = await applicationService.generateNewApiKey(payload.applicationId, caller.id)
        return {apiKey}
    }
}