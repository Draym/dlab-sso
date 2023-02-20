import Email from "../../utils/email/Email";
import {VerificationCodeTarget} from "../../enums";
import {
    MeEmailUpdateRequest,
    MePasswordUpdateRequest
} from "../../api/dtos/user"
import {EmailSendCodeRequest, EmailVerifyCodeRequest, EmailVerifyCodeResponse} from "../../api/dtos/email"
import {userCredentialsService, userService, verificationCodeService} from "../../services"
import Password from "../../utils/validators/password"
import mailer from "../../clients/mail.client"
import {AuthBodyRequest, BodyRequest, QueryRequest} from "@d-lab/api-kit"

export default class UserMeController {

    async updatePassword(req: AuthBodyRequest<MePasswordUpdateRequest>): Promise<void> {
        const caller = req.caller
        const payload = req.body
        Password.validate(payload.newPassword, payload.newPasswordConfirm)
        await userCredentialsService.updatePassword(caller.id, undefined, payload.newPassword)
    }

    async updateEmail(req: AuthBodyRequest<MeEmailUpdateRequest>): Promise<void> {
        const payload = req.body
        const caller = req.caller
        await userCredentialsService.updateEmail(caller.id, payload.email, payload.verificationCode)
    }

    async sendCodeForEmail(req: BodyRequest<EmailSendCodeRequest>): Promise<void> {
        const payload = req.body
        const code = await verificationCodeService.createCode(payload.email, VerificationCodeTarget.EmailUpdate)
        const mail = Email.generateUpdateEmailMessage(mailer.config.from, payload.email, code)
        await mailer.send(mail, "verification code")

    }

    async verifyCodeForEmail(req: QueryRequest<EmailVerifyCodeRequest>): Promise<EmailVerifyCodeResponse> {
        const payload = req.query
        const verificationCode = parseInt(payload.verificationCode)
        await verificationCodeService.checkValidity(payload.email, verificationCode, VerificationCodeTarget.EmailUpdate)
        return {
            email: payload.email,
            verificationCode: verificationCode,
            isValid: true
        }
    }

    async sendCodeForPassword(req: BodyRequest<EmailSendCodeRequest>): Promise<void> {
        const payload = req.body
        const code = await verificationCodeService.createCode(payload.email, VerificationCodeTarget.PasswordUpdate)
        const mail = Email.generateUpdatePasswordMessage(mailer.config.from, payload.email, code)
        await mailer.send(mail, "verification code")
    }

    async verifyCodeForPassword(req: QueryRequest<EmailVerifyCodeRequest>): Promise<EmailVerifyCodeResponse> {
        const payload = req.query
        const verificationCode = parseInt(payload.verificationCode)
        await verificationCodeService.checkValidity(payload.email, verificationCode, VerificationCodeTarget.PasswordUpdate)
        return {
            email: payload.email,
            verificationCode: verificationCode,
            isValid: true
        }
    }
}