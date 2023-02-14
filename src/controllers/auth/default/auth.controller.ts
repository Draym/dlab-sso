import {NextFunction, Response} from "express"
import {AuthRequest, BodyRequest, Empty, QueryRequest} from "../../../interfaces/api.interface"
import Errors from "../../../utils/errors/Errors"
import {LoginRequest, RegisterRequest} from "../../../dtos/reponse/default"
import {TokenResponse} from "../../../dtos/reponse"
import {
    newsletterSubscriptionService,
    tokenService,
    userService, verificationCodeService
} from "../../../services"
import {isNotNull, throwIfNot} from "../../../utils/validators/checks"
import Password from "../../../utils/validators/password"
import {EmailSendCodeRequest, EmailVerifyCodeRequest, EmailVerifyCodeResponse} from "../../../dtos/email"
import {VerificationCodeTarget} from "../../../enums"
import Email from "../../../utils/email/Email"
import mailer from "../../../clients/mail.client"
import {Auth} from "../../../utils/response"

export default class AuthController {

     async sendCodeForRegister(req: BodyRequest<EmailSendCodeRequest>): Promise<Empty> {
        try {
            const payload = req.body
            if (await userService.emailExists(payload.email)) {
                throw Errors.CONFLICT_Email(payload.email)
            }
            const code = await verificationCodeService.createCode(payload.email, VerificationCodeTarget.Register)
            const mail = Email.generateWelcomeMessage(mailer.config.from, payload.email, code)
            await mailer.send(mail, "verification code")
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

     async verifyCodeForRegister(req: QueryRequest<EmailVerifyCodeRequest>): Promise<EmailVerifyCodeResponse> {
        try {
            const payload = req.query
            const verificationCode = parseInt(payload.verificationCode)
            await verificationCodeService.checkValidity(payload.email, verificationCode, VerificationCodeTarget.Register)
            res.status(200).json({
                email: payload.email,
                verificationCode: verificationCode,
                isValid: true
            })
        } catch (error) {
            next(error)
        }
    }

     async register(req: BodyRequest<RegisterRequest>): Promise<TokenResponse> {
        try {
            const payload = req.body

            Password.validate(payload.password, payload.passwordConfirm)

            const user = await userService.createUser(payload.email, payload.password, payload.verificationCode)
            if (payload.newsletterSubscription) {
                await newsletterSubscriptionService.subscribe(user.identifier)
            }
            await Auth.success(user, res)
        } catch (error) {
            next(error)
        }
    }

     async logout(req: AuthRequest): Promise<Empty> {
        try {
            const token = req.auth.token
            if (isNotNull(token)) {
                await tokenService.destroyToken(token!)
            }
            Auth.clearCookieResponse(res)
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

     async login(req: BodyRequest<LoginRequest>): Promise<TokenResponse> {
        try {
            const payload = req.body

            const user = await userService.getByEmail(payload.email)
            throwIfNot(user.isValidPassword(payload.password), Errors.REJECTED_Password())

            await Auth.success(user, res, payload.shortSession === true)
        } catch (error) {
            next(error)
        }
    }
}