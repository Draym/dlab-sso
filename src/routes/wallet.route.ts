import {Router} from "express"
import {ApiAccessType, ApiModule, Endpoint, Role} from "../enums"
import authMiddleware from "../middleware/auth.middleware"
import hasRole from "../middleware/has-role.middleware"
import WalletController from "../controllers/wallet/wallet.controller"
import {validateQueryRequest} from "../middleware/validate-request.middleware"
import {FindWalletOwnerRequest, FindWalletRequest} from "../api/dtos/wallet/history"
import {ApiScopeImpl} from "./api.scope"

const router = Router()
const walletController = new WalletController()

const scope = ApiScopeImpl.default(ApiModule.Wallet, ApiAccessType.Management)



router.get(Endpoint.WALLET_FindOwner, authMiddleware(scope), hasRole(Role.Operator), validateQueryRequest(FindWalletOwnerRequest), walletController.findOwner)

router.get(Endpoint.WALLET_FindWallet, authMiddleware(scope), hasRole(Role.Operator), validateQueryRequest(FindWalletRequest), walletController.findWallet)

export default router