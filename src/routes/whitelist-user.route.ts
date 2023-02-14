import {Router} from "express"
import authMiddleware from "../middleware/auth.middleware"
import {validateRequest} from "../middleware/validate-request.middleware"
import {ApiAccessType, ApiModule, Endpoint, Role} from "../enums"
import hasRole from "../middleware/has-role.middleware"
import WhitelistUserController from "../controllers/game-access/whitelist/whitelist-user.controller"
import {
    WhitelistUserAddByWalletRequest,
    WhitelistUserAddRequest,
    WhitelistUserDeleteRequest
} from "../dtos/game-access/whitelist"
import {ApiScopeImpl} from "./api.scope"

const router = Router()
const whitelistUserController = new WhitelistUserController()

const scope = ApiScopeImpl.default(ApiModule.Whitelist, ApiAccessType.Management).write()



router.get(Endpoint.WHITELIST_USER_All, authMiddleware(scope.read()), hasRole(Role.Operator), whitelistUserController.all)

router.post(Endpoint.WHITELIST_USER_Add, validateRequest(WhitelistUserAddRequest), authMiddleware(scope), hasRole(Role.Operator), whitelistUserController.add)

router.post(Endpoint.WHITELIST_USER_AddByWallet, validateRequest(WhitelistUserAddByWalletRequest), authMiddleware(scope), hasRole(Role.Operator), whitelistUserController.addByWallet)

router.post(Endpoint.WHITELIST_USER_Delete, validateRequest(WhitelistUserDeleteRequest), authMiddleware(scope), hasRole(Role.Operator), whitelistUserController.delete)

router.post(Endpoint.WHITELIST_USER_DeleteAll, authMiddleware(scope), hasRole(Role.Moderator), whitelistUserController.deleteAll)

export default router