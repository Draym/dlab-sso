import EthSignature from "../../utils/eth/EthSignature"
import {userService, verificationCodeService, walletService, walletValidatorsService} from "../../services"
import {
    EthAccountBindRequest, EthAccountUnbindRequest,
    EthChallengeRequest,
    EthChallengeResponse,
    EthIsBoundRequest,
    EthIsBoundResponse
} from "../../api/dtos/auth/wallet/eth"
import {VerificationCodeTarget, WalletType} from "../../enums"
import Errors from "../../utils/errors/Errors"
import {
    EmailSendCodeRequest,
    EmailSendCodeResponse,
    EmailVerifyCodeRequest,
    EmailVerifyCodeResponse
} from "../../api/dtos/email"
import Email from "../../utils/email/Email"
import mailer from "../../clients/mail.client"
import {AuthBodyRequest, BodyRequest, eq, isNotNull, QueryRequest} from "@d-lab/api-kit"

export default class EthWalletController {

    async sendCodeForBind(req: BodyRequest<EmailSendCodeRequest>): Promise<EmailSendCodeResponse> {

        const payload = req.body
        const potentialUser = await userService.findByEmail(payload.email)
        if (isNotNull(potentialUser)) {
            if (await walletService.ownerHasWallet(potentialUser!.id, WalletType.ETH)) {
                throw Errors.CONFLICT_WalletBind(`email[${payload.email}]`)
            }
        }
        const code = await verificationCodeService.createCode(payload.email, VerificationCodeTarget.BindWallet)
        const mail = Email.generateBindWalletMessage(mailer.config.from, payload.email, code)
        await mailer.send(mail, "verification code")
        return {
            userExists: isNotNull(potentialUser)
        }
    }

    async verifyCodeForBind(req: QueryRequest<EmailVerifyCodeRequest>): Promise<EmailVerifyCodeResponse> {

        const payload = req.query
        const verificationCode = parseInt(payload.verificationCode)
        await verificationCodeService.checkValidity(payload.email, verificationCode, VerificationCodeTarget.BindWallet)
        return {
            email: payload.email,
            verificationCode: verificationCode,
            isValid: true
        }
    }

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

    async updateAccountPasswordChallenge(req: BodyRequest<EthChallengeRequest>): Promise<EthChallengeResponse> {
        const payload = req.body
        const validator = await walletValidatorsService.create(payload.walletAddress)
        return {
            walletAddress: validator.address,
            message: EthSignature.updatePasswordMessage(payload.walletAddress, validator.nonce)
        }
    }
}