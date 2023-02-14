import {AuthBodyRequest, BodyRequest, Empty, QueryRequest} from "../../interfaces/api.interface"
import {NextFunction, Response} from "express"
import EthSignature from "../../utils/eth/EthSignature"
import {userService, verificationCodeService, walletService, walletValidatorsService} from "../../services"
import {
    EthChallengeRequest,
    EthChallengeBindAccountRequest,
    EthChallengeResponse,
    IsBoundRequest,
    IsBoundResponse,
    WalletBindAccountRequest,
    WalletRevealAccountRequest,
    WalletRevealAccountResponse, WalletUnbindAccountRequest,
    WalletUpdateAccountEmailRequest,
    WalletUpdateAccountPasswordRequest
} from "../../dtos/wallet/eth"
import {isNotNull} from "../../utils/validators/checks"
import {VerificationCodeTarget, WalletType} from "../../enums"
import Errors from "../../utils/errors/Errors"
import {
    EmailSendCodeRequest,
    EmailSendCodeResponse,
    EmailVerifyCodeRequest,
    EmailVerifyCodeResponse
} from "../../dtos/email"
import Email from "../../utils/email/Email"
import Password from "../../utils/validators/password"
import mailer from "../../clients/mail.client"
import {logger} from "../../utils/logger"

export default class EthWalletController {

     async sendCodeForBind(req: BodyRequest<EmailSendCodeRequest>): Promise<EmailSendCodeResponse> {
        try {
            const payload = req.body
            const potentialUser = await userService.findByEmail(payload.email)
            if (isNotNull(potentialUser)) {
                if (await walletService.ownerHasWallet(potentialUser!.identifier, WalletType.ETH)) {
                    throw Errors.CONFLICT_WalletBind(payload.email)
                }
            }
            const code = await verificationCodeService.createCode(payload.email, VerificationCodeTarget.BindWallet)
            const mail = Email.generateBindWalletMessage(mailer.config.from, payload.email, code)
            await mailer.send(mail, "verification code")
            res.status(200).json({
                userExists: isNotNull(potentialUser)
            })
        } catch (error) {
            next(error)
        }
    }

     async verifyCodeForBind(req: QueryRequest<EmailVerifyCodeRequest>): Promise<EmailVerifyCodeResponse> {
        try {
            const payload = req.query
            const verificationCode = parseInt(payload.verificationCode)
            await verificationCodeService.checkValidity(payload.email, verificationCode, VerificationCodeTarget.BindWallet)
            res.status(200).json({
                email: payload.email,
                verificationCode: verificationCode,
                isValid: true
            })
        } catch (error) {
            next(error)
        }
    }

     async bindAccountChallenge(req: BodyRequest<EthChallengeBindAccountRequest>): Promise<EthChallengeResponse> {
        try {
            const payload = req.body
            const validator = await walletValidatorsService.create(payload.walletAddress)
            res.status(200).json({
                walletAddress: validator.address,
                message: EthSignature.bindMessage(payload.walletAddress, payload.email, validator.nonce)
            })
        } catch (error) {
            next(error)
        }
    }

     async isBound(req: QueryRequest<IsBoundRequest>): Promise<IsBoundResponse> {
        try {
            const payload = req.query
            const wallet = await walletService.findByAddress(payload.walletAddress)
            res.status(200).json({
                bound: isNotNull(wallet)
            })
        } catch (error) {
            next(error)
        }
    }

     async bindToAccount(req: AuthBodyRequest<WalletBindAccountRequest>): Promise<Empty> {
        try {
            const payload = req.body
            const caller = req.caller
            const user = await userService.getById(caller.id)
            await walletValidatorsService.validateSignatureForBind(payload.walletAddress, user.email, payload.signature)
            await walletService.bindToUser(user.identifier, payload.walletAddress, WalletType.ETH)

            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

     async unbindAccountChallenge(req: BodyRequest<EthChallengeRequest>): Promise<EthChallengeResponse> {
        try {
            const payload = req.body
            const validator = await walletValidatorsService.create(payload.walletAddress)
            res.status(200).json({
                walletAddress: validator.address,
                message: EthSignature.unbindMessage(payload.walletAddress, validator.nonce)
            })
        } catch (error) {
            next(error)
        }
    }

     async unbindFromAccount(req: AuthBodyRequest<WalletUnbindAccountRequest>): Promise<Empty> {
        try {
            const payload = req.body
            const caller = req.caller

            await walletValidatorsService.validateSignatureForUnbind(payload.walletAddress, payload.signature)
            await walletService.unbindFromUser(caller.identifier, payload.walletAddress, WalletType.ETH)

            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

     async revealAccountChallenge(req: BodyRequest<EthChallengeRequest>): Promise<EthChallengeResponse> {
        try {
            const payload = req.body
            const validator = await walletValidatorsService.create(payload.walletAddress)
            res.status(200).json({
                walletAddress: validator.address,
                message: EthSignature.revealMessage(payload.walletAddress, validator.nonce)
            })
        } catch (error) {
            next(error)
        }
    }

     async revealAccount(req: BodyRequest<WalletRevealAccountRequest>): Promise<WalletRevealAccountResponse> {
        try {
            const payload = req.body
            await walletValidatorsService.validateSignatureForReveal(payload.walletAddress, payload.signature)
            const wallet = await walletService.getByAddress(payload.walletAddress)
            const user = await userService.getByIdentifier(wallet.ownerIdentifier)
            res.status(200).json({
                walletAddress: payload.walletAddress,
                email: user.email,
                identifier: user.identifier
            })
        } catch (error) {
            next(error)
        }
    }

     async updateAccountPasswordChallenge(req: BodyRequest<EthChallengeRequest>): Promise<EthChallengeResponse> {
        try {
            const payload = req.body
            const validator = await walletValidatorsService.create(payload.walletAddress)
            res.status(200).json({
                walletAddress: validator.address,
                message: EthSignature.updatePasswordMessage(payload.walletAddress, validator.nonce)
            })
        } catch (error) {
            next(error)
        }
    }

     async updateAccountPassword(req: BodyRequest<WalletUpdateAccountPasswordRequest>): Promise<Empty> {
        try {
            const payload = req.body
            await walletValidatorsService.validateSignatureForUpdatePassword(payload.walletAddress, payload.signature)
            const wallet = await walletService.getByAddress(payload.walletAddress)
            const user = await userService.getByIdentifier(wallet.ownerIdentifier)

            Password.validate(payload.newPassword, payload.newPasswordConfirm)

            await userService.updatePassword(user.id, undefined, payload.newPassword)
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

     async updateAccountEmailChallenge(req: BodyRequest<EthChallengeRequest>): Promise<EthChallengeResponse> {
        try {
            const payload = req.body
            const validator = await walletValidatorsService.create(payload.walletAddress)
            res.status(200).json({
                walletAddress: validator.address,
                message: EthSignature.updateEmailMessage(payload.walletAddress, validator.nonce)
            })
        } catch (error) {
            next(error)
        }
    }

     async updateAccountEmail(req: BodyRequest<WalletUpdateAccountEmailRequest>): Promise<Empty> {
        try {
            const payload = req.body
            await walletValidatorsService.validateSignatureForUpdateEmail(payload.walletAddress, payload.signature)
            const wallet = await walletService.getByAddress(payload.walletAddress)
            const user = await userService.getByIdentifier(wallet.ownerIdentifier)

            await userService.updateEmail(user.id, payload.newEmail, payload.newEmailVerificationCode)
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }
}