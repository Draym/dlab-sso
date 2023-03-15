import {Router} from "express"
import {Endpoint} from "../enums"
import WalletEthController from "../controllers/wallet/wallet-eth.controller"
import {validateQueryRequest, validateRequest} from "../middleware/validate-request.middleware"
import {
    EthAccountBindRequest, EthAccountUnbindRequest,
    EthChallengeRequest, EthIsBoundRequest
} from "../api/dtos/auth/wallet/eth"
import authMiddleware from "../middleware/auth.middleware"
import {handle} from "@d-lab/api-kit"

const router = Router()
const ctrl = new WalletEthController()

router.post(Endpoint.WALLET_ETH_CHALLENGE_UnbindAccount, validateRequest(EthChallengeRequest), handle.bind(ctrl.unbindAccountChallenge))
router.post(Endpoint.WALLET_ETH_CHALLENGE_BindAccount, validateRequest(EthChallengeRequest), handle.bind(ctrl.bindAccountChallenge))
router.post(Endpoint.WALLET_ETH_BindAccount, authMiddleware(), validateRequest(EthAccountBindRequest), handle.bind(ctrl.bindToAccount))
router.post(Endpoint.WALLET_ETH_UnbindAccount, authMiddleware(), validateRequest(EthAccountUnbindRequest), handle.bind(ctrl.unbindFromAccount))
router.get(Endpoint.WALLET_ETH_IsBound, validateQueryRequest(EthIsBoundRequest), handle.bind(ctrl.isBound))

export default router