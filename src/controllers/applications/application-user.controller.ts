import {
    AppUserCreateRequest,
    AppUserDeleteRequest,
    AppUserFindRequest,
    AppUserIsAllowedRequest,
    AppUserIsAllowedResponse,
    AppUserDto,
    AppUsersResponse,
    AppUserUpdateRequest
} from "../../api/dtos/applications/user"
import {applicationService, applicationUserService} from "../../services"
import Errors from "../../utils/errors/Errors"
import {ApiAccessType, AuthBodyRequest, AuthQueryRequest, isNotNull, throwIf, throwIfNull} from "@d-lab/api-kit"
import RequireAppOwner from "../../utils/decorators/require-app-owner.decorator"
import ApplicationUserApi from "../../api/application-user.api"

export default class ApplicationUserController implements ApplicationUserApi {
    async isAllowed(req: AuthQueryRequest<AppUserIsAllowedRequest>): Promise<AppUserIsAllowedResponse> {
        const payload = req.query

        const appKey = req.auth.apiKey
        throwIfNull(appKey, Errors.REQUIRE_ApiKey())

        const token = req.auth.token
        let userId
        if (isNotNull(token)) {
            userId = token!.userId
        } else if (isNotNull(payload.userId)) {
            userId = parseInt(payload.userId!)
        } else {
            throw Errors.REQUIRE_Token()
        }
        const allowed = await applicationUserService.isUserAllowed(appKey!.appId, userId, payload.requiredRole, payload.strict === "true")

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
    async addUser(req: AuthBodyRequest<AppUserCreateRequest>): Promise<AppUserDto> {
        const payload = req.body
        const application = await applicationService.get(payload.applicationId)
        throwIf(application.type !== ApiAccessType.Management, Errors.REQUIRE_APP_TypeAccess(ApiAccessType.Personal, ApiAccessType.Management))
        return await applicationUserService.create(payload.applicationId, payload.userId, payload.role)
    }

    @RequireAppOwner
    async updateUser(req: AuthBodyRequest<AppUserUpdateRequest>): Promise<AppUserDto> {
        const payload = req.body
        const application = await applicationService.get(payload.applicationId)
        throwIf(application.type !== ApiAccessType.Management, Errors.REQUIRE_APP_TypeAccess(ApiAccessType.Personal, ApiAccessType.Management))
        return await applicationUserService.update(payload.applicationId, payload.userId, payload.role)
    }

    @RequireAppOwner
    async deleteUser(req: AuthBodyRequest<AppUserDeleteRequest>): Promise<AppUserDto> {
        const payload = req.body
        const application = await applicationService.get(payload.applicationId)
        throwIf(application.type !== ApiAccessType.Management, Errors.REQUIRE_APP_TypeAccess(ApiAccessType.Personal, ApiAccessType.Management))
        return await applicationUserService.delete(payload.applicationId, payload.userId)
    }
}