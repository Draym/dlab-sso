import EthSignature from "../../utils/eth/EthSignature"
import {userService, verificationCodeService, walletService, walletValidatorsService} from "../../services"
import {
    EthAccountBindRequest, EthAccountUnbindRequest,
    EthChallengeRequest,
    EthChallengeResponse,
    EthIsBoundRequest,
    EthIsBoundResponse
} from "../../api/dtos/auth/wallet/eth"
import {WalletType} from "../../enums"
import {AuthBodyRequest, BodyRequest, eq, isNotNull, QueryRequest} from "@d-lab/api-kit"
import WalletEthApi from "../../api/wallet-eth.api"

export default class WalletEthController implements WalletEthApi {

    async bindAccountChallenge(req: AuthBodyRequest<EthChallengeRequest>): Promise<EthChallengeResponse> {
        const payload = req.body
        const caller = req.caller
        const validator = await walletValidatorsService.create(payload.walletAddress)
        return {
            walletAddress: validator.address,
            message: EthSignature.bindMessage(payload.walletAddress, caller.uuid, validator.nonce)
        }
    }

    async isBound(req: QueryRequest<EthIsBoundRequest>): Promise<EthIsBoundResponse> {
        const payload = req.query
        const wallet = await walletService.findBy(eq({address: payload.walletAddress}))
        return {
            bound: isNotNull(wallet)
        }
    }

    async bindToAccount(req: AuthBodyRequest<EthAccountBindRequest>): Promise<void> {
        const payload = req.body
        const caller = req.caller
        const user = await userService.get(caller.id)
        await walletValidatorsService.validateSignatureForBind(payload.walletAddress, user.uuid, payload.signature)
        await walletService.bindToUser(user.id, payload.walletAddress, WalletType.ETH)
    }

    async unbindAccountChallenge(req: BodyRequest<EthChallengeRequest>): Promise<EthChallengeResponse> {
        const payload = req.body
        const validator = await walletValidatorsService.create(payload.walletAddress)
        return {
            walletAddress: validator.address,
            message: EthSignature.unbindMessage(payload.walletAddress, validator.nonce)
        }
    }

    async unbindFromAccount(req: AuthBodyRequest<EthAccountUnbindRequest>): Promise<void> {
        const payload = req.body
        const caller = req.caller

        await walletValidatorsService.validateSignatureForUnbind(payload.walletAddress, payload.signature)
        await walletService.unbindFromUser(caller.id, payload.walletAddress, WalletType.ETH)
    }
}