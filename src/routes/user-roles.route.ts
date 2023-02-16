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
import {ApiScopeImpl} from "./api.scope"


const router = Router()
const userRolesController = new UserRolesController()

const scope = ApiScopeImpl.default(ApiModule.User, ApiAccessType.Management).write()



router.get(Endpoint.USER_ROLE_All, validateRequest(UserRoleAllRequest), authMiddleware(scope.read()), hasRole(Role.Moderator), userRolesController.all)

router.post(Endpoint.USER_ROLE_Update, validateRequest(UserRoleUpdateRequest), authMiddleware(scope), hasRole(Role.Moderator), userRolesController.updateRole)

router.delete(Endpoint.USER_ROLE_Delete, validateRequest(UserRoleDeleteRequest), authMiddleware(scope), hasRole(Role.Moderator), userRolesController.deleteRole)

router.post(Endpoint.USER_ROLE_BatchUpdate, validateRequest(UserRoleBatchUpdateRequest), authMiddleware(scope), hasRole(Role.Moderator), userRolesController.batchUpdateRole)

router.delete(Endpoint.USER_ROLE_BatchDelete, validateRequest(UserRoleBatchDeleteRequest), authMiddleware(scope), hasRole(Role.Moderator), userRolesController.batchDeleteRole)

router.post(Endpoint.USER_ROLE_BatchUpdateByEmail, validateRequest(UserRoleBatchUpdateByEmailRequest), authMiddleware(scope), hasRole(Role.Moderator), userRolesController.batchUpdateRoleByEmail)

router.delete(Endpoint.USER_ROLE_BatchDeleteByEmail, validateRequest(UserRoleBatchDeleteByEmailRequest), authMiddleware(scope), hasRole(Role.Moderator), userRolesController.batchDeleteRoleByEmail)


export default router