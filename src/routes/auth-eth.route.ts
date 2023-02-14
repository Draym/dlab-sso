import {Router} from "express"
import {validateRequest} from "../middleware/validate-request.middleware"
import {
    EthChallengeLoginRequest,
    EthLoginRequest,
    EthRegisterBindRequest,
    EthRegisterRequest
} from "../dtos/reponse/wallet/eth"
import {Endpoint} from "../enums"
import AuthWalletEthController from "../controllers/auth/wallet/eth.controller"

const router = Router()
const controller = new AuthWalletEthController()



router.post(Endpoint.ETH_Challenge, validateRequest(EthChallengeLoginRequest), controller.loginChallenge)

router.post(Endpoint.ETH_Login, validateRequest(EthLoginRequest), controller.login)

router.post(Endpoint.ETH_Register, validateRequest(EthRegisterRequest), controller.registerAndLogin)

router.post(Endpoint.ETH_BindRegister, validateRequest(EthRegisterBindRequest), controller.registerBindAndLogin)


export default router