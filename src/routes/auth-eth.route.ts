import {Router} from "express"
import {validateRequest} from "../middleware/validate-request.middleware"
import {
    EthChallengeRequest,
    EthLoginRequest
} from "../api/dtos/auth/wallet/eth"
import {Endpoint} from "../enums"
import AuthWalletEthController from "../controllers/auth/wallet/eth.controller"
import {handle} from "@d-lab/api-kit"

const router = Router()
const ctrl = new AuthWalletEthController()

router.post(Endpoint.ETH_Challenge, validateRequest(EthChallengeRequest), handle.bind(ctrl.loginChallenge))
router.post(Endpoint.ETH_Login, validateRequest(EthLoginRequest), handle.bind(ctrl.login))

export default router