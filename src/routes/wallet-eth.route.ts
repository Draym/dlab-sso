import {Router} from "express"
import {Endpoint} from "../enums"
import EthWalletController from "../controllers/wallet/eth-wallet.controller"
import {validateQueryRequest, validateRequest} from "../middleware/validate-request.middleware"
import {
    EthAccountBindRequest, EthAccountUnbindRequest,
    EthChallengeRequest, EthIsBoundRequest
} from "../api/dtos/auth/wallet/eth"
import {EmailSendCodeRequest, EmailVerifyCodeRequest} from "../api/dtos/email"
import authMiddleware from "../middleware/auth.middleware"
import {handle} from "@d-lab/api-kit"

const router = Router()
const ctrl = new EthWalletController()

router.post(Endpoint.WALLET_ETH_CHALLENGE_BindAccount, validateRequest(EthChallengeRequest), handle.bind(ctrl.bindAccountChallenge))
router.post(Endpoint.WALLET_ETH_BindAccount, authMiddleware(), validateRequest(EthAccountBindRequest), handle.bind(ctrl.bindToAccount))
router.get(Endpoint.WALLET_ETH_IsBound, validateQueryRequest(EthIsBoundRequest), handle.bind(ctrl.isBound))
router.post(Endpoint.WALLET_ETH_EMAIL_RequestCode, validateRequest(EmailSendCodeRequest), handle.bind(ctrl.sendCodeForBind))
router.get(Endpoint.WALLET_ETH_EMAIL_VerifyCode, validateQueryRequest(EmailVerifyCodeRequest), handle.bind(ctrl.verifyCodeForBind))
router.post(Endpoint.WALLET_ETH_CHALLENGE_UpdateAccountPassword, validateRequest(EthChallengeRequest), handle.bind(ctrl.updateAccountPasswordChallenge))
router.post(Endpoint.WALLET_ETH_CHALLENGE_UnbindAccount, validateRequest(EthChallengeRequest), handle.bind(ctrl.unbindAccountChallenge))
router.post(Endpoint.WALLET_ETH_UnbindAccount, authMiddleware(), validateRequest(EthAccountUnbindRequest), handle.bind(ctrl.unbindFromAccount))

export default router