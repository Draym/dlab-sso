import {Router} from "express"
import {PlanningAssistantController} from "../controllers/game-access/planning"
import {ApiModule, Endpoint, Role} from "../enums"
import {validateRequest} from "../middleware/validate-request.middleware"
import {AssistantCreateSessionRequest, AssistantDeleteSessionRequest} from "../api/dtos/game-access/planning/assistant"
import authMiddleware from "../middleware/auth.middleware"
import hasRole from "../middleware/has-role.middleware"
import {ApiAccessType, ApiScopeImpl, handle} from "@d-lab/api-kit"

const router = Router()
const ctrl = new PlanningAssistantController()

const scope = ApiScopeImpl.default(ApiModule.Planning, ApiAccessType.Management)

router.post(Endpoint.PLANNING_ASSISTANT_Create, validateRequest(AssistantCreateSessionRequest), authMiddleware(scope), hasRole(Role.Operator), handle.bind(ctrl.create))
router.delete(Endpoint.PLANNING_ASSISTANT_Delete, validateRequest(AssistantDeleteSessionRequest), authMiddleware(scope), hasRole(Role.Operator), handle.bind(ctrl.delete))

export default router
