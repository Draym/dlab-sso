import {Router} from "express"
import authMiddleware from "../middleware/auth.middleware"
import {validateRequest} from "../middleware/validate-request.middleware"
import {ApiModule, Endpoint} from "../enums"
import ApplicationController from "../controllers/applications/application.controller"
import {ApplicationCreateRequest, ApplicationDeleteRequest, ApplicationNewApiKeyRequest} from "../api/dtos/applications"
import Role from "../enums/role.enum"
import hasRole from "../middleware/has-role.middleware"
import {ApiScopeImpl, handle} from "@d-lab/api-kit"

const router = Router()
const ctrl = new ApplicationController()

const scope = ApiScopeImpl.default(ApiModule.Application, null)

router.post(Endpoint.APPLICATION_Create, validateRequest(ApplicationCreateRequest), authMiddleware(), handle.bind(ctrl.create))
router.delete(Endpoint.APPLICATION_Delete, validateRequest(ApplicationDeleteRequest), authMiddleware(), handle.bind(ctrl.delete))
router.post(Endpoint.APPLICATION_NewApiKey, validateRequest(ApplicationNewApiKeyRequest), authMiddleware(), handle.bind(ctrl.requestNewApiKey))
router.get(Endpoint.APPLICATION_All, authMiddleware(), hasRole(Role.Operator), handle.bind(ctrl.all))
router.get(Endpoint.APPLICATION_AllForOwner, authMiddleware(), handle.bind(ctrl.allByOwner))
router.get(Endpoint.APPLICATION_Get, authMiddleware(scope), handle.bind(ctrl.details))
router.get(Endpoint.APPLICATION_IsOwner, authMiddleware(scope), handle.bind(ctrl.isOwner))

export default router