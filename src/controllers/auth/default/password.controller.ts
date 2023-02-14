import {NextFunction, Response} from "express"
import {BodyRequest, Empty, QueryRequest} from "../../../interfaces/api.interface"
import Email from "../../../utils/email/Email"
import {VerificationCodeTarget} from "../../../enums"
import Errors from "../../../utils/errors/Errors"
import {EmailSendCodeRequest, EmailVerifyCodeRequest, EmailVerifyCodeResponse} from "../../../dtos/email"
import {userService, verificationCodeService} from "../../../services"
import Password from "../../../utils/validators/password"
import mailer from "../../../clients/mail.client"
import {PasswordResetRequest} from "../../../dtos/reponse/default"

export default class AuthPasswordController {

     async resetPassword(req: BodyRequest<PasswordResetRequest>): Promise<Empty> {
        try {
            const payload = req.body
            Password.validate(payload.newPassword, payload.newPassword)
            await userService.resetPassword(payload.email, payload.newPassword, payload.verificationCode)
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

     async sendCode(req: BodyRequest<EmailSendCodeRequest>): Promise<Empty> {
        try {
            const payload = req.body
            const userExist = await userService.emailExists(payload.email)
            if (!userExist) {
                throw Errors.NOT_FOUND_UserEmail(payload.email)
            }
            const code = await verificationCodeService.createCode(payload.email, VerificationCodeTarget.PasswordReset)
            const mail = Email.generateResetPasswordMessage(mailer.config.from, payload.email, code)
            await mailer.send(mail, "verification code")
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

     async verifyCode(req: QueryRequest<EmailVerifyCodeRequest>): Promise<EmailVerifyCodeResponse> {
        try {
            const payload = req.query
            const verificationCode = parseInt(payload.verificationCode)
            await verificationCodeService.checkValidity(payload.email, verificationCode, VerificationCodeTarget.PasswordReset)
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