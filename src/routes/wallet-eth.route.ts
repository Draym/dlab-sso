import {Router} from "express"
import {Endpoint} from "../enums"
import EthWalletController from "../controllers/wallet/eth-wallet.controller"
import {validateQueryRequest, validateRequest} from "../middleware/validate-request.middleware"
import {
    EthChallengeBindAccountRequest,
    EthChallengeRequest,
    IsBoundRequest,
    WalletBindAccountRequest,
    WalletRevealAccountRequest,
    WalletUpdateAccountPasswordRequest,
    WalletUpdateAccountEmailRequest, WalletUnbindAccountRequest
} from "../dtos/wallet/eth"
import {EmailSendCodeRequest, EmailVerifyCodeRequest} from "../dtos/email"
import authMiddleware from "../middleware/auth.middleware"

const router = Router()
const ethWalletController = new EthWalletController()



router.post(Endpoint.WALLET_ETH_CHALLENGE_BindAccount, validateRequest(EthChallengeBindAccountRequest), ethWalletController.bindAccountChallenge)

router.post(Endpoint.WALLET_ETH_BindAccount, authMiddleware(), validateRequest(WalletBindAccountRequest), ethWalletController.bindToAccount)

router.get(Endpoint.WALLET_ETH_IsBound, validateQueryRequest(IsBoundRequest), ethWalletController.isBound)

router.post(Endpoint.WALLET_ETH_EMAIL_RequestCode, validateRequest(EmailSendCodeRequest), ethWalletController.sendCodeForBind)

router.get(Endpoint.WALLET_ETH_EMAIL_VerifyCode, validateQueryRequest(EmailVerifyCodeRequest), ethWalletController.verifyCodeForBind)

router.post(Endpoint.WALLET_ETH_CHALLENGE_RevealAccount, validateRequest(EthChallengeRequest), ethWalletController.revealAccountChallenge)

router.post(Endpoint.WALLET_ETH_RevealAccount, validateRequest(WalletRevealAccountRequest), ethWalletController.revealAccount)

router.post(Endpoint.WALLET_ETH_CHALLENGE_UpdateAccountEmail, validateRequest(EthChallengeRequest), ethWalletController.updateAccountEmailChallenge)

router.post(Endpoint.WALLET_ETH_UpdateAccountEmail, validateRequest(WalletUpdateAccountEmailRequest), ethWalletController.updateAccountEmail)

router.post(Endpoint.WALLET_ETH_CHALLENGE_UpdateAccountPassword, validateRequest(EthChallengeRequest), ethWalletController.updateAccountPasswordChallenge)

router.post(Endpoint.WALLET_ETH_UpdateAccountPassword, validateRequest(WalletUpdateAccountPasswordRequest), ethWalletController.updateAccountPassword)

router.post(Endpoint.WALLET_ETH_CHALLENGE_UnbindAccount, validateRequest(EthChallengeRequest), ethWalletController.unbindAccountChallenge)

router.post(Endpoint.WALLET_ETH_UnbindAccount, authMiddleware(), validateRequest(WalletUnbindAccountRequest), ethWalletController.unbindFromAccount)

export default router