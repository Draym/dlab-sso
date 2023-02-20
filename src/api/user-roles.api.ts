import {
    UserRoleAllRequest,
    UserRoleAllResponse,
    UserRoleBatchDeleteRequest,
    UserRoleBatchUpdateRequest,
    UserRoleDeleteRequest,
    UserRoleUpdateRequest
} from "./dtos/user"
import {AuthBodyRequest} from "@d-lab/api-kit"

export default interface UserRolesApi {
     all(req: AuthBodyRequest<UserRoleAllRequest>): Promise<UserRoleAllResponse>
     updateRole(req: AuthBodyRequest<UserRoleUpdateRequest>): Promise<void>
     deleteRole(req: AuthBodyRequest<UserRoleDeleteRequest>): Promise<void>
     batchUpdateRole(req: AuthBodyRequest<UserRoleBatchUpdateRequest>): Promise<void>
     batchDeleteRole(req: AuthBodyRequest<UserRoleBatchDeleteRequest>): Promise<void>
}