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
} from "../api/dtos/applications/user"
import {ApiScopeImpl, handle} from "@d-lab/api-kit"

const router = Router()
const ctrl = new ApplicationUserController()

const scope = ApiScopeImpl.default(ApiModule.Application, null)

router.get(Endpoint.APPLICATION_USER_IsAllowed, validateQueryRequest(AppUserIsAllowedRequest), authMiddleware(scope), handle.bind(ctrl.isAllowed))
router.get(Endpoint.APPLICATION_USER_All, validateQueryRequest(AppUserFindRequest), authMiddleware(), handle.bind(ctrl.allUsers))
router.post(Endpoint.APPLICATION_USER_Add, validateRequest(AppUserCreateRequest), authMiddleware(), handle.bind(ctrl.addUser))
router.put(Endpoint.APPLICATION_USER_Update, validateRequest(AppUserUpdateRequest), authMiddleware(), handle.bind(ctrl.updateUser))
router.delete(Endpoint.APPLICATION_USER_Delete, validateRequest(AppUserDeleteRequest), authMiddleware(), handle.bind(ctrl.deleteUser))

export default router