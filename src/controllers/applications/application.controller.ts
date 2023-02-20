import {applicationScopeService, applicationService, applicationUserService} from "../../services"
import {
    ApiKeyResponse,
    ApplicationAllOwnResponse,
    ApplicationAllResponse,
    ApplicationCreateRequest,
    ApplicationDeleteRequest,
    ApplicationIsOwnerResponse,
    ApplicationNewApiKeyRequest,
    ApplicationDto, ApplicationGetRequest
} from "../../api/dtos/applications"
import {ApplicationScopeModel} from "../../models"
import Errors from "../../utils/errors/Errors"
import {
    AuthBodyRequest,
    AuthPathRequest,
    AuthRequest,
    eq,
    groupBy,
    include,
    isNull,
    Page,
    throwIfNull
} from "@d-lab/api-kit"

export default class ApplicationController {
    async allByOwner(req: AuthRequest): Promise<ApplicationAllOwnResponse> {
        const caller = req.caller
        const applications = await applicationService.findAll(eq({ownerId: caller.id}))
        const appIds = applications.map(app => app.id)

        const groupScopes = groupBy(await applicationScopeService.findAll(include({id: appIds})), "applicationId")

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

    async get(req: AuthPathRequest<ApplicationGetRequest>): Promise<ApplicationDto> {
        const payload = req.params
        const app = await applicationService.get(Number.parseInt(payload.id))
        const users = await applicationUserService.getUsers(app.id)
        return {
            ...app,
            users: users
        }
    }

    async all(_: AuthRequest): Promise<ApplicationAllResponse> {
        const applications = await applicationService.getAll()
        return {applications}
    }

    async details(req: AuthRequest): Promise<ApplicationDto> {
        const apiKey = req.auth.apiKey
        throwIfNull(apiKey, Errors.REQUIRE_ApiKey())
        const app = await applicationService.get(apiKey!.appId)
        const users = await applicationUserService.getUsers(app.id)
        return {
            ...app,
            users: users
        }
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