import {Router} from "express"
import authMiddleware from "../middleware/auth.middleware"
import {validateRequest} from "../middleware/validate-request.middleware"
import {ApiModule, Endpoint} from "../enums"
import ApplicationController from "../controllers/applications/application.controller"
import ApplicationNewApiKeyRequest from "../dtos/applications/new-api-key.request"
import {ApplicationCreateRequest, ApplicationDeleteRequest} from "../dtos/applications"
import Role from "../enums/role.enum"
import {ApiScopeImpl} from "./api.scope"
import hasRole from "../middleware/has-role.middleware"

const router = Router()
const controller = new ApplicationController()

const scope = ApiScopeImpl.default(ApiModule.Application, null)



router.post(Endpoint.APPLICATION_Create, validateRequest(ApplicationCreateRequest), authMiddleware(), controller.create)

router.delete(Endpoint.APPLICATION_Delete, validateRequest(ApplicationDeleteRequest), authMiddleware(), controller.delete)

router.post(Endpoint.APPLICATION_NewApiKey, validateRequest(ApplicationNewApiKeyRequest), authMiddleware(), controller.requestNewApiKey)

router.get(Endpoint.APPLICATION_All, authMiddleware(), hasRole(Role.Operator), controller.all)

router.get(Endpoint.APPLICATION_AllForOwner, authMiddleware(), controller.allByOwner)

router.get(Endpoint.APPLICATION_Get, authMiddleware(scope), controller.details)

router.get(Endpoint.APPLICATION_IsOwner, authMiddleware(scope), controller.isOwner)


export default router