import {Router} from "express"
import {PlanningSessionController} from "../controllers/game-access/planning"
import {ApiAccessType, ApiModule, Endpoint, Role} from "../enums"
import {validateRequest, validateQueryRequest} from "../middleware/validate-request.middleware"
import {
    SessionAllRequest,
    SessionCreateRequest,
    SessionDeleteRequest,
    SessionFindNextRequest,
    SessionGetRequest,
    SessionUpdateRequest
} from "../api/dtos/game-access/planning/session"
import authMiddleware from "../middleware/auth.middleware"
import hasRole from "../middleware/has-role.middleware"
import {ApiScopeImpl, handle} from "@d-lab/api-kit"

const router = Router()
const ctrl = new PlanningSessionController()

const scope = ApiScopeImpl.default(ApiModule.Planning, ApiAccessType.Management).write()


router.post(Endpoint.PLANNING_SESSION_Create, validateRequest(SessionCreateRequest), authMiddleware(scope), hasRole(Role.Operator), handle.bind(ctrl.create))
router.delete(Endpoint.PLANNING_SESSION_Delete, validateRequest(SessionDeleteRequest), authMiddleware(scope), hasRole(Role.Operator), handle.bind(ctrl.delete))
router.put(Endpoint.PLANNING_SESSION_Update, validateRequest(SessionUpdateRequest), authMiddleware(scope), hasRole(Role.Operator), handle.bind(ctrl.update))
router.get(Endpoint.PLANNING_SESSION_All, validateQueryRequest(SessionAllRequest), handle.bind(ctrl.all))
router.get(Endpoint.PLANNING_SESSION_Get, validateQueryRequest(SessionGetRequest), handle.bind(ctrl.get))
router.get(Endpoint.PLANNING_SESSION_FindNext, validateQueryRequest(SessionFindNextRequest), handle.bind(ctrl.findNext))

export default router