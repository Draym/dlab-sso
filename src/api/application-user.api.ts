import {
    AppUserCreateRequest,
    AppUserDeleteRequest,
    AppUserFindRequest,
    AppUserIsAllowedRequest,
    AppUserIsAllowedResponse,
    AppUserDto,
    AppUsersResponse,
    AppUserUpdateRequest
} from "./dtos/applications/user"
import {AuthBodyRequest, AuthQueryRequest,} from "@d-lab/api-kit"

export default interface ApplicationUserApi {
    isUserAllowed(req: AuthQueryRequest<AppUserIsAllowedRequest>): Promise<AppUserIsAllowedResponse>
    allUsers(req: AuthQueryRequest<AppUserFindRequest>): Promise<AppUsersResponse>
    addUser(req: AuthBodyRequest<AppUserCreateRequest>): Promise<AppUserDto>
    updateUser(req: AuthBodyRequest<AppUserUpdateRequest>): Promise<AppUserDto>
    deleteUser(req: AuthBodyRequest<AppUserDeleteRequest>): Promise<AppUserDto>
}