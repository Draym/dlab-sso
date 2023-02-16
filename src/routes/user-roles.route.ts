import {Router} from "express"
import UserRolesController from "../controllers/user/user-roles.controller"
import authMiddleware from "../middleware/auth.middleware"
import {validateRequest} from "../middleware/validate-request.middleware"
import {ApiAccessType, ApiModule, Endpoint, Role} from "../enums"
import hasRole from "../middleware/has-role.middleware"
import {
    UserRoleBatchDeleteByEmailRequest,
    UserRoleBatchDeleteRequest, UserRoleBatchUpdateByEmailRequest,
    UserRoleBatchUpdateRequest,
    UserRoleDeleteRequest,
    UserRoleUpdateRequest,
    UserRoleAllRequest
} from "../api/dtos/user"
import {ApiScopeImpl, handle} from "@d-lab/api-kit"

const router = Router()
const ctrl = new UserRolesController()

const scope = ApiScopeImpl.default(ApiModule.User, ApiAccessType.Management).write()

router.get(Endpoint.USER_ROLE_All, validateRequest(UserRoleAllRequest), authMiddleware(scope.read()), hasRole(Role.Moderator), handle.bind(ctrl.all))
router.post(Endpoint.USER_ROLE_Update, validateRequest(UserRoleUpdateRequest), authMiddleware(scope), hasRole(Role.Moderator), handle.bind(ctrl.updateRole))
router.delete(Endpoint.USER_ROLE_Delete, validateRequest(UserRoleDeleteRequest), authMiddleware(scope), hasRole(Role.Moderator), handle.bind(ctrl.deleteRole))
router.post(Endpoint.USER_ROLE_BatchUpdate, validateRequest(UserRoleBatchUpdateRequest), authMiddleware(scope), hasRole(Role.Moderator), handle.bind(ctrl.batchUpdateRole))
router.delete(Endpoint.USER_ROLE_BatchDelete, validateRequest(UserRoleBatchDeleteRequest), authMiddleware(scope), hasRole(Role.Moderator), handle.bind(ctrl.batchDeleteRole))
router.post(Endpoint.USER_ROLE_BatchUpdateByEmail, validateRequest(UserRoleBatchUpdateByEmailRequest), authMiddleware(scope), hasRole(Role.Moderator), handle.bind(ctrl.batchUpdateRoleByEmail))
router.delete(Endpoint.USER_ROLE_BatchDeleteByEmail, validateRequest(UserRoleBatchDeleteByEmailRequest), authMiddleware(scope), hasRole(Role.Moderator), handle.bind(ctrl.batchDeleteRoleByEmail))

export default router