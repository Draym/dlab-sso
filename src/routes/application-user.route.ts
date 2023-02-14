import {Router} from "express"
import {ApiModule, Endpoint} from "../enums"
import {validateQueryRequest, validateRequest} from "../middleware/validate-request.middleware"
import authMiddleware from "../middleware/auth.middleware"
import ApplicationUserController from "../controllers/applications/application-user.controller"
import {
    AppUserFindRequest,
    AppUserCreateRequest,
    AppUserDeleteRequest,
    AppUserUpdateRequest, AppUserIsAllowedRequest
} from "../dtos/applications/user"
import hasRole from "../middleware/has-role.middleware"
import Role from "../enums/role.enum"
import {ApiScopeImpl} from "./api.scope"

const router = Router()
const controller = new ApplicationUserController()

const scope = ApiScopeImpl.default(ApiModule.Application, null)

router.get(Endpoint.APPLICATION_USER_IsAllowed, validateQueryRequest(AppUserIsAllowedRequest), authMiddleware(scope), controller.isUserAllowed)
router.get(Endpoint.APPLICATION_USER_All, validateQueryRequest(AppUserFindRequest), authMiddleware(), controller.allAppUsers)
router.get(Endpoint.APPLICATION_USER_Find, validateQueryRequest(AppUserFindRequest), authMiddleware(), hasRole(Role.Operator), controller.findUsers)
router.post(Endpoint.APPLICATION_USER_Add, validateRequest(AppUserCreateRequest), authMiddleware(), controller.addUser)
router.put(Endpoint.APPLICATION_USER_Update, validateRequest(AppUserUpdateRequest), authMiddleware(), controller.updateUser)
router.delete(Endpoint.APPLICATION_USER_Delete, validateRequest(AppUserDeleteRequest), authMiddleware(), controller.deleteUser)


export default router