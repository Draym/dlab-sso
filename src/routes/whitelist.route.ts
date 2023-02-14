import {Router} from "express"
import WhitelistController from "../controllers/game-access/whitelist/whitelist.controller"
import authMiddleware from "../middleware/auth.middleware"
import {validateQueryRequest} from "../middleware/validate-request.middleware"
import {ApiAccessType, ApiModule, Endpoint, Role} from "../enums"
import hasRole from "../middleware/has-role.middleware"
import {WhitelistFindRequest, WhitelistIsAuthorizedRequest} from "../dtos/game-access/whitelist"
import {ApiScopeImpl} from "./api.scope"

const router = Router()
const whitelistController = new WhitelistController()

const scope = ApiScopeImpl.default(ApiModule.Whitelist, ApiAccessType.Management).write()



router.get(Endpoint.WHITELIST_Find, validateQueryRequest(WhitelistFindRequest), whitelistController.find)

router.get(Endpoint.WHITELIST_IsAuthorized, validateQueryRequest(WhitelistIsAuthorizedRequest), whitelistController.isAuthorized)

router.get(Endpoint.WHITELIST_Status, whitelistController.status)

router.post(Endpoint.WHITELIST_Activate, authMiddleware(scope), hasRole(Role.Moderator), whitelistController.activate)

router.post(Endpoint.WHITELIST_Close, authMiddleware(scope), hasRole(Role.Moderator), whitelistController.close)

router.post(Endpoint.WHITELIST_OpenAll, authMiddleware(scope), hasRole(Role.Moderator), whitelistController.openForAll)


export default router