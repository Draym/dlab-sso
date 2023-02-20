import {
    EthChallengeRequest,
    EthChallengeResponse,
    EthLoginRequest,
} from "../../../api/dtos/auth/wallet/eth"
import {
    userService,
    walletService,
    walletValidatorsService
} from "../../../services"
import EthSignature from "../../../utils/eth/EthSignature"
import {WalletType} from "../../../enums"
import {BodyRequest, eq, isNotNull} from "@d-lab/api-kit"
import {TokenResponse} from "../../../api/dtos/auth"
import AuthResponse from "../../../utils/reponse/auth.response"
import {Response} from "express"
import {User} from "../../../interfaces"

export default class AuthWalletEthController {

    async loginChallenge(req: BodyRequest<EthChallengeRequest>): Promise<EthChallengeResponse> {
        const payload = req.body
        const validator = await walletValidatorsService.create(payload.walletAddress)
        return {
            walletAddress: validator.address,
            message: EthSignature.loginMessage(payload.walletAddress, validator.nonce)
        }
    }

    async login(req: BodyRequest<EthLoginRequest>, res: Response): Promise<TokenResponse> {
        const payload = req.body
        await walletValidatorsService.validateSignatureForLogin(payload.walletAddress, payload.signature)
        const wallet = await walletService.findBy(eq({address: payload.walletAddress}))

        let user: User

        if (isNotNull(wallet)) {
            user = await userService.get(wallet!.userId)
        } else {
            user = await userService.create()
            await walletService.bindToUser(user.id, payload.walletAddress, WalletType.ETH)
        }
        return await AuthResponse.success(user, res)
    }
}