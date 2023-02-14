import {Router} from "express"
import {PlanningSessionController} from "../controllers/game-access/planning"
import {ApiAccessType, ApiModule, Endpoint, Role} from "../enums"
import {validateRequest, validateQueryRequest} from "../middleware/validate-request.middleware"
import {
    SessionAllRequest,
    SessionCreateRequest,
    SessionDeleteRequest,
    SessionFindRequest,
    SessionFindNextRequest,
    SessionGetRequest,
    SessionUpdateRequest
} from "../dtos/game-access/planning/session"
import authMiddleware from "../middleware/auth.middleware"
import hasRole from "../middleware/has-role.middleware"
import {ApiScopeImpl} from "./api.scope"

const router = Router()
const planningSessionController = new PlanningSessionController()

const scope = ApiScopeImpl.default(ApiModule.Planning, ApiAccessType.Management).write()



router.post(Endpoint.PLANNING_SESSION_Create, validateRequest(SessionCreateRequest), authMiddleware(scope), hasRole(Role.Operator), planningSessionController.create)

router.delete(Endpoint.PLANNING_SESSION_Delete, validateRequest(SessionDeleteRequest), authMiddleware(scope), hasRole(Role.Operator), planningSessionController.delete)

router.put(Endpoint.PLANNING_SESSION_Update, validateRequest(SessionUpdateRequest), authMiddleware(scope), hasRole(Role.Operator), planningSessionController.update)

router.get(Endpoint.PLANNING_SESSION_All, validateQueryRequest(SessionAllRequest), planningSessionController.all)

router.get(Endpoint.PLANNING_SESSION_Get, validateQueryRequest(SessionGetRequest), planningSessionController.get)

router.get(Endpoint.PLANNING_SESSION_Find, validateQueryRequest(SessionFindRequest), planningSessionController.find)

router.get(Endpoint.PLANNING_SESSION_FindNext, validateQueryRequest(SessionFindNextRequest), planningSessionController.findNext)

export default router