import Errors from "../../../utils/errors/Errors"
import {
    newsletterSubscriptionService,
    tokenService, userCredentialsService,
    userService, verificationCodeService
} from "../../../services"
import Password from "../../../utils/validators/password"
import {EmailSendCodeRequest, EmailVerifyCodeRequest, EmailVerifyCodeResponse} from "../../../api/dtos/email"
import {VerificationCodeTarget} from "../../../enums"
import Email from "../../../utils/email/Email"
import mailer from "../../../clients/mail.client"
import {AuthRequest, BodyRequest, eq, isNotNull, QueryRequest, throwIfNot} from "@d-lab/api-kit"
import {LoginRequest, RegisterRequest} from "../../../api/dtos/auth/default"
import {TokenResponse} from "../../../api/dtos/auth"
import AuthResponse from "../../../utils/reponse/auth.response"
import {Response} from "express"

export default class AuthController {

    async sendCodeForRegister(req: BodyRequest<EmailSendCodeRequest>): Promise<void> {
        const payload = req.body
        if (await userService.emailExists(payload.email)) {
            throw Errors.CONFLICT_Email(payload.email)
        }
        const code = await verificationCodeService.createCode(payload.email, VerificationCodeTarget.Register)
        const mail = Email.generateWelcomeMessage(mailer.config.from, payload.email, code)
        await mailer.send(mail, "verification code")
    }

    async verifyCodeForRegister(req: QueryRequest<EmailVerifyCodeRequest>): Promise<EmailVerifyCodeResponse> {

        const payload = req.query
        const verificationCode = parseInt(payload.verificationCode)
        await verificationCodeService.checkValidity(payload.email, verificationCode, VerificationCodeTarget.Register)
        return {
            email: payload.email,
            verificationCode: verificationCode,
            isValid: true
        }
    }

    async register(req: BodyRequest<RegisterRequest>, res: Response): Promise<TokenResponse> {
        const payload = req.body

        await verificationCodeService.checkValidityAndDestroy(payload.email, payload.verificationCode, VerificationCodeTarget.Register)

        Password.validate(payload.password, payload.passwordConfirm)

        const user = await userService.create(payload.email)
        if (payload.newsletterSubscription) {
            await newsletterSubscriptionService.subscribe(user.uuid)
        }
        await userCredentialsService.create(user.uuid, payload.email, payload.password)
        return await AuthResponse.success(user, res)
    }

    async logout(req: AuthRequest, res: Response): Promise<void> {
        const token = req.auth.token
        if (isNotNull(token)) {
            await tokenService.destroyToken(token!)
        }
        AuthResponse.clearCookieResponse(res)
    }

    async login(req: BodyRequest<LoginRequest>, res: Response): Promise<TokenResponse> {
        const payload = req.body

        const credentials = await userCredentialsService.getBy(eq({email: payload.email}))
        throwIfNot(credentials.isValidPassword(payload.password), Errors.REJECTED_Password())
        const user = await userService.getByUuid(credentials.userUuid)

        return await AuthResponse.success(user, res, payload.shortSession === true)
    }
}