import {Router} from "express"
import authMiddleware from "../middleware/auth.middleware"
import {validateRequest} from "../middleware/validate-request.middleware"
import {Endpoint} from "../enums"
import {
    ApplicationAddScopeRequest,
    ApplicationDeleteScopeRequest
} from "../dtos/applications"
import ApplicationScopeController from "../controllers/applications/application-scope.controller"

const router = Router()
const controller = new ApplicationScopeController()



router.post(Endpoint.APPLICATION_SCOPE_Add, validateRequest(ApplicationAddScopeRequest), authMiddleware(), controller.addScope)

router.delete(Endpoint.APPLICATION_SCOPE_Delete, validateRequest(ApplicationDeleteScopeRequest), authMiddleware(), controller.deleteScope)


export default router