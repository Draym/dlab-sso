import {
    AppUserCreateRequest,
    AppUserDeleteRequest,
    AppUserFindRequest,
    AppUserIsAllowedRequest,
    AppUserIsAllowedResponse,
    AppUserResponse,
    AppUsersResponse,
    AppUserUpdateRequest
} from "../../api/dtos/applications/user"
import {applicationService, applicationUserService} from "../../services"
import Errors from "../../utils/errors/Errors"
import {ApiAccessType} from "../../enums"
import {AuthBodyRequest, AuthQueryRequest, throwIf, throwIfNull} from "@d-lab/api-kit"
import RequireAppOwner from "../../utils/decorators/require-app-owner.decorator"

export default class ApplicationUserController {
    async isUserAllowed(req: AuthQueryRequest<AppUserIsAllowedRequest>): Promise<AppUserIsAllowedResponse> {
        const token = req.auth.token
        const appKey = req.auth.apiKey

        throwIfNull(token, Errors.REQUIRE_Token())
        throwIfNull(appKey, Errors.REQUIRE_ApiKey())

        const payload = req.query
        const allowed = await applicationUserService.isUserAllowed(appKey!.appId, token!.userId, payload.requiredRole, payload.strict === "true")

        return {allowed}
    }

    @RequireAppOwner
    async allUsers(req: AuthQueryRequest<AppUserFindRequest>): Promise<AppUsersResponse> {
        const payload = req.query
        const applicationId = Number.parseInt(payload.applicationId)
        const appUsers = await applicationUserService.getUsers(applicationId)
        return {
            users: appUsers
        }
    }

    @RequireAppOwner
    async addUser(req: AuthBodyRequest<AppUserCreateRequest>): Promise<AppUserResponse> {
        const payload = req.body
        const application = await applicationService.get(payload.applicationId)
        throwIf(application.type !== ApiAccessType.Management, Errors.REQUIRE_APP_TypeAccess(ApiAccessType.Personal, ApiAccessType.Management))
        return await applicationUserService.create(payload.applicationId, payload.userId, payload.role)
    }

    @RequireAppOwner
    async updateUser(req: AuthBodyRequest<AppUserUpdateRequest>): Promise<AppUserResponse> {
        const payload = req.body
        const application = await applicationService.get(payload.applicationId)
        throwIf(application.type !== ApiAccessType.Management, Errors.REQUIRE_APP_TypeAccess(ApiAccessType.Personal, ApiAccessType.Management))
        return await applicationUserService.update(payload.applicationId, payload.userId, payload.role)
    }

    @RequireAppOwner
    async deleteUser(req: AuthBodyRequest<AppUserDeleteRequest>): Promise<AppUserResponse> {
        const payload = req.body
        const application = await applicationService.get(payload.applicationId)
        throwIf(application.type !== ApiAccessType.Management, Errors.REQUIRE_APP_TypeAccess(ApiAccessType.Personal, ApiAccessType.Management))
        return await applicationUserService.delete(payload.applicationId, payload.userId)
    }
}