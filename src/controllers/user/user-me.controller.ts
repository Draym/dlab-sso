import {NextFunction, Response} from "express"
import {Empty, AuthBodyRequest, BodyRequest, QueryRequest} from "../../interfaces/api.interface"
import Email from "../../utils/email/Email";
import {VerificationCodeTarget} from "../../enums";
import {
    MeEmailUpdateByEmailRequest,
    MeEmailUpdateRequest,
    MePasswordUpdateByEmailRequest,
    MePasswordUpdateRequest
} from "../../dtos/user"
import {EmailSendCodeRequest, EmailVerifyCodeRequest, EmailVerifyCodeResponse} from "../../dtos/email"
import {userService, verificationCodeService} from "../../services"
import Password from "../../utils/validators/password"
import mailer from "../../clients/mail.client"

export default class UserMeController {

     async updatePassword(req: AuthBodyRequest<MePasswordUpdateRequest>): Promise<Empty> {
        try {
            const caller = req.caller
            const payload = req.body
            Password.validate(payload.newPassword, payload.newPasswordConfirm)
            await userService.updatePassword(caller.id, undefined, payload.newPassword)
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

     async updatePasswordByEmail(req: BodyRequest<MePasswordUpdateByEmailRequest>): Promise<Empty> {
        try {
            const payload = req.body
            Password.validate(payload.newPassword, payload.newPasswordConfirm)
            await userService.updatePasswordByEmail(payload.email, payload.newPassword, payload.verificationCode)
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

     async updateEmail(req: AuthBodyRequest<MeEmailUpdateRequest>): Promise<Empty> {
        try {
            const payload = req.body
            const caller = req.caller
            await userService.updateEmail(caller.id, payload.email, payload.verificationCode)
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

     async updateEmailByEmail(req: BodyRequest<MeEmailUpdateByEmailRequest>): Promise<Empty> {
        try {
            const payload = req.body
            await userService.updateEmailByEmail(payload.oldEmail, payload.oldEmailVerificationCode, payload.newEmail, payload.newEmailVerificationCode)
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

     async sendCodeForEmail(req: BodyRequest<EmailSendCodeRequest>): Promise<Empty> {
        try {
            const payload = req.body
            const code = await verificationCodeService.createCode(payload.email, VerificationCodeTarget.EmailUpdate)
            const mail = Email.generateUpdateEmailMessage(mailer.config.from, payload.email, code)
            await mailer.send(mail, "verification code")
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

     async verifyCodeForEmail(req: QueryRequest<EmailVerifyCodeRequest>): Promise<EmailVerifyCodeResponse> {
        try {
            const payload = req.query
            const verificationCode = parseInt(payload.verificationCode)
            await verificationCodeService.checkValidity(payload.email, verificationCode, VerificationCodeTarget.EmailUpdate)
            res.status(200).json({
                email: payload.email,
                verificationCode: verificationCode,
                isValid: true
            })
        } catch (error) {
            next(error)
        }
    }

     async sendCodeForPassword(req: BodyRequest<EmailSendCodeRequest>): Promise<Empty> {
        try {
            const payload = req.body
            const code = await verificationCodeService.createCode(payload.email, VerificationCodeTarget.PasswordUpdate)
            const mail = Email.generateUpdatePasswordMessage(mailer.config.from, payload.email, code)
            await mailer.send(mail, "verification code")
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

     async verifyCodeForPassword(req: QueryRequest<EmailVerifyCodeRequest>): Promise<EmailVerifyCodeResponse> {
        try {
            const payload = req.query
            const verificationCode = parseInt(payload.verificationCode)
            await verificationCodeService.checkValidity(payload.email, verificationCode, VerificationCodeTarget.PasswordUpdate)
            res.status(200).json({
                email: payload.email,
                verificationCode: verificationCode,
                isValid: true
            })
        } catch (error) {
            next(error)
        }
    }
}