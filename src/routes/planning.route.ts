import {Router} from "express"
import {ApiAccessType, ApiModule, Endpoint} from "../enums"
import {validateQueryRequest} from "../middleware/validate-request.middleware"
import {PlanningController} from "../controllers/game-access/planning"
import {PlanningGetRequest} from "../api/dtos/game-access/planning"
import authMiddleware from "../middleware/auth.middleware"
import hasRole from "../middleware/has-role.middleware"
import Role from "../enums/role.enum"
import {ApiScopeImpl, handle} from "@d-lab/api-kit"

const router = Router()
const ctrl = new PlanningController()

const scope = ApiScopeImpl.default(ApiModule.Planning, ApiAccessType.Management)

router.get(Endpoint.PLANNING_Get, validateQueryRequest(PlanningGetRequest), authMiddleware(scope), hasRole(Role.Operator), handle.bind(ctrl.get))

export default router
