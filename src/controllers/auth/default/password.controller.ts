import Email from "../../../utils/email/Email"
import {VerificationCodeTarget} from "../../../enums"
import Errors from "../../../utils/errors/Errors"
import {EmailSendCodeRequest, EmailVerifyCodeRequest, EmailVerifyCodeResponse} from "../../../api/dtos/email"
import {userCredentialsService, verificationCodeService} from "../../../services"
import Password from "../../../utils/validators/password"
import mailer from "../../../clients/mail.client"
import {BodyRequest, QueryRequest} from "@d-lab/api-kit"
import {PasswordResetRequest} from "../../../api/dtos/auth/default"
import AuthPasswordApi from "../../../api/auth-password.api"

export default class AuthPasswordController implements AuthPasswordApi {

    async resetPassword(req: BodyRequest<PasswordResetRequest>): Promise<void> {
        const payload = req.body
        Password.validate(payload.newPassword, payload.newPassword)
        await userCredentialsService.resetPassword(payload.email, payload.newPassword, payload.verificationCode)
    }

    async sendCode(req: BodyRequest<EmailSendCodeRequest>): Promise<void> {
        const payload = req.body
        const userExist = await userCredentialsService.emailExists(payload.email)
        if (!userExist) {
            throw Errors.NOT_FOUND_User(`email[${payload.email}]`)
        }
        const code = await verificationCodeService.createCode(payload.email, VerificationCodeTarget.PasswordReset)
        const mail = Email.generateResetPasswordMessage(mailer.config.from, payload.email, code)
        await mailer.send(mail, "verification code")
    }

    async verifyCode(req: QueryRequest<EmailVerifyCodeRequest>): Promise<EmailVerifyCodeResponse> {
        const payload = req.query
        const verificationCode = parseInt(payload.verificationCode)
        await verificationCodeService.checkValidity(payload.email, verificationCode, VerificationCodeTarget.PasswordReset)
        return {
            email: payload.email,
            verificationCode: verificationCode,
            isValid: true
        }
    }
}