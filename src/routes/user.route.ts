import {Router} from "express"
import UserController from "../controllers/user/user.controller"
import {validateQueryRequest} from "../middleware/validate-request.middleware"
import authMiddleware from "../middleware/auth.middleware"
import {ApiAccessType, ApiModule, Endpoint} from "../enums"
import hasRole from "../middleware/has-role.middleware"
import {UserAllRequest, UserFindRequest} from "../api/dtos/user"
import Role from "../enums/role.enum"
import {ApiScopeImpl, handle} from "@d-lab/api-kit"

const router = Router()
const ctrl = new UserController()

const scope = ApiScopeImpl.default(ApiModule.User, ApiAccessType.Management)

router.get(Endpoint.USER_Find, validateQueryRequest(UserFindRequest), authMiddleware(scope), hasRole(Role.Operator), handle.bind(ctrl.find))
router.get(Endpoint.USER_All, validateQueryRequest(UserAllRequest), authMiddleware(scope), hasRole(Role.Operator), handle.bind(ctrl.all))

export default router