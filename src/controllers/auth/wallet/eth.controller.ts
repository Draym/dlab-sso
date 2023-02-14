import {
    EthLoginRequest,
    EthChallengeLoginRequest,
    EthRegisterRequest,
    EthRegisterBindRequest
} from "../../../api/dtos/auth/wallet/eth"
import {EthChallengeResponse} from "../../../dtos/wallet/eth"
import {TokenResponse} from "../../../dtos/reponse"
import {
    userService,
    verificationCodeService,
    walletService,
    walletValidatorsService
} from "../../../services"
import EthSignature from "../../../utils/eth/EthSignature"
import {VerificationCodeTarget, WalletType} from "../../../enums"
import Password from "../../../utils/validators/password"
import {Auth} from "../../../utils/response"

export default class AuthWalletEthController {

     async loginChallenge(req: BodyRequest<EthChallengeLoginRequest>): Promise<EthChallengeResponse> {
        try {
            const payload = req.body
            const validator = await walletValidatorsService.create(payload.walletAddress)
            res.status(200).json({
                walletAddress: validator.address,
                message: EthSignature.loginMessage(payload.walletAddress, validator.nonce)
            })
        } catch (error) {
            next(error)
        }
    }

     async login(req: BodyRequest<EthLoginRequest>): Promise<TokenResponse> {
        try {
            const payload = req.body
            await walletValidatorsService.validateSignatureForLogin(payload.walletAddress, payload.signature)
            const wallet = await walletService.getByAddress(payload.walletAddress)
            const user = await userService.getByIdentifier(wallet.ownerIdentifier)

            await Auth.success(user, res)
        } catch (error) {
            next(error)
        }
    }


     async registerAndLogin(req: BodyRequest<EthRegisterRequest>): Promise<TokenResponse> {
        try {
            const payload = req.body
            await verificationCodeService.checkValidityAndDestroy(payload.email, payload.verificationCode, VerificationCodeTarget.BindWallet)
            await walletValidatorsService.validateSignatureForBind(payload.walletAddress, payload.email, payload.signature)

            Password.validate(payload.password, payload.passwordConfirm)

            const user = await userService.createUser(payload.email, payload.password, undefined)
            await walletService.bindToUser(user.identifier, payload.walletAddress, WalletType.ETH)

            await Auth.success(user, res)
        } catch (error) {
            next(error)
        }
    }



     async registerBindAndLogin(req: BodyRequest<EthRegisterBindRequest>): Promise<TokenResponse> {
        try {
            const payload = req.body

            await verificationCodeService.checkValidityAndDestroy(payload.email, payload.verificationCode, VerificationCodeTarget.BindWallet)
            await walletValidatorsService.validateSignatureForBind(payload.walletAddress, payload.email, payload.signature)
            const user = await userService.getByEmail(payload.email)

            await walletService.bindToUser(user.identifier, payload.walletAddress, WalletType.ETH)

            await Auth.success(user, res)
        } catch (error) {
            next(error)
        }
    }

}