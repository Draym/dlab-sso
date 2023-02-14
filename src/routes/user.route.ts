import {Router} from "express"
import UserController from "../controllers/user/user.controller"
import {validateQueryRequest} from "../middleware/validate-request.middleware"
import authMiddleware from "../middleware/auth.middleware"
import {ApiAccessType, ApiModule, Endpoint} from "../enums"
import hasRole from "../middleware/has-role.middleware"
import {UserAllRequest, UserFindRequest} from "../dtos/user"
import {ApiScopeImpl} from "./api.scope"
import Role from "../enums/role.enum"

const router = Router()
const userController = new UserController()

const scope = ApiScopeImpl.default(ApiModule.User, ApiAccessType.Management)


router.get(Endpoint.USER_Find, validateQueryRequest(UserFindRequest), authMiddleware(scope), hasRole(Role.Operator), userController.find)

router.get(Endpoint.USER_All, validateQueryRequest(UserAllRequest), authMiddleware(scope), hasRole(Role.Operator), userController.all)

export default router