import {Router} from "express"
import {PlanningAssistantController} from "../controllers/game-access/planning"
import {ApiAccessType, ApiModule, Endpoint, Role} from "../enums"
import {validateRequest} from "../middleware/validate-request.middleware"
import {AssistantCreateSessionRequest, AssistantDeleteSessionRequest} from "../dtos/game-access/planning/assistant"
import authMiddleware from "../middleware/auth.middleware"
import hasRole from "../middleware/has-role.middleware"
import {ApiScopeImpl} from "./api.scope"

const router = Router()
const planningAssistantController = new PlanningAssistantController()

const scope = ApiScopeImpl.default(ApiModule.Planning, ApiAccessType.Management)



router.post(Endpoint.PLANNING_ASSISTANT_Create, validateRequest(AssistantCreateSessionRequest), authMiddleware(scope), hasRole(Role.Operator), planningAssistantController.create)

router.delete(Endpoint.PLANNING_ASSISTANT_Delete, validateRequest(AssistantDeleteSessionRequest), authMiddleware(scope), hasRole(Role.Operator), planningAssistantController.delete)

export default router
