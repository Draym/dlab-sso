import {Router} from "express"
import authMiddleware from "../middleware/auth.middleware"
import {validateRequest} from "../middleware/validate-request.middleware"
import {Endpoint} from "../enums"
import {
    ApplicationAddScopeRequest,
    ApplicationDeleteScopeRequest
} from "../api/dtos/applications"
import ApplicationScopeController from "../controllers/applications/application-scope.controller"
import {handle} from "@d-lab/api-kit"

const router = Router()
const ctrl = new ApplicationScopeController()

router.post(Endpoint.APPLICATION_SCOPE_Add, validateRequest(ApplicationAddScopeRequest), authMiddleware(), handle.bind(ctrl.addScope))
router.delete(Endpoint.APPLICATION_SCOPE_Delete, validateRequest(ApplicationDeleteScopeRequest), authMiddleware(), handle.bind(ctrl.deleteScope))

export default router