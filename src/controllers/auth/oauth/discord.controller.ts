import {BodyRequest, QueryRequest} from "../../../interfaces/api.interface"
import {NextFunction, Response} from "express"
import {
    DiscordAuthResponse,
    DiscordGetAuthorizeResponse, DiscordGetAuthorizeUrlRequest,
    DiscordLoginRequest, DiscordRegisterBindRequest, DiscordRegisterRequest
} from "../../../dtos/reponse/oauth/discord"
import DiscordClient from "../../../clients/discord/discord.client"
import {
    discordAccountService,
    discordValidatorService,
    tokenService,
    userService,
    verificationCodeService
} from "../../../services"
import {nanoid} from "nanoid"
import {isNotNull, throwIfNotNull, throwIfNull} from "../../../utils/validators/checks"
import Errors from "../../../utils/errors/Errors"
import {TokenResponse} from "../../../dtos/reponse"
import {RequireAccountResponse} from "../../../dtos/reponse/oauth/discord/reponse.response"
import {VerificationCodeTarget} from "../../../enums"
import Password from "../../../utils/validators/password"
import {
    EmailSendCodeRequest,
    EmailSendCodeResponse,
    EmailVerifyCodeRequest,
    EmailVerifyCodeResponse
} from "../../../dtos/email"
import Email from "../../../utils/email/Email"
import mailer from "../../../clients/mail.client"
import {Auth} from "../../../utils/response"

export default class OAuthDiscordController {
     async getAuthorizeURL(req: QueryRequest<DiscordGetAuthorizeUrlRequest>): Promise<DiscordGetAuthorizeResponse> {
        try {
            const payload = req.query
            const nonce = nanoid()
            res.status(200).json({
                url: DiscordClient.getAuthorizeURL(DiscordClient.getRequiredScopes(), nonce, payload.redirectUri),
                requestNonce: nonce
            })
        } catch (error) {
            next(error)
        }
    }

     async authenticateAndLogin(req: BodyRequest<DiscordLoginRequest>): Promise<DiscordAuthResponse> {
        try {
            const payload = req.body

            const discordToken = await DiscordClient.authenticateUser(payload.code, payload.redirectUri).catch(e => {
                throw Errors.SERVICE_PROVIDER_ApiError(e)
            })
            const discordUser = await DiscordClient.getUserMe(discordToken.access_token)

            const discordAccount = await discordAccountService.findByDiscordId(discordUser.id)

            let token: TokenResponse | null = null
            let requireAccount: RequireAccountResponse | null = null

            if (isNotNull(discordAccount)) {
                const user = await userService.getByIdentifier(discordAccount!.ownerIdentifier)

                const newRefreshToken = await tokenService.newRefreshToken(user!.id, user!.identifier, user!.email)
                const newToken = await tokenService.newToken(user!.id, user!.identifier, user!.email)
                token = {
                    token: newToken.token,
                    refreshToken: newRefreshToken.token,
                    expireAt: new Date(Date.now() + newToken.expiresIn),
                    user: {
                        id: user!.id,
                        email: user!.email,
                        identifier: user!.identifier,
                        createdAt: user!.createdAt,
                        updatedAt: user!.updatedAt
                    }
                }
                Auth.setCookieResponse(res, newToken.token, newToken.expiresIn)
            } else {
                throwIfNull(discordUser.email, Errors.REQUIRE_DiscordEmail())

                const validator = await discordValidatorService.generate(discordUser.id, discordToken.access_token, discordToken.scope, payload.requestNonce)
                requireAccount = {
                    discordEmail: discordUser.email,
                    authKey: validator.authKey
                }
            }

            res.status(200).json({
                requireAccount: isNotNull(requireAccount),
                account: requireAccount,
                token: token
            })
        } catch (error) {
            next(error)
        }
    }

     async sendCodeForDiscord(req: BodyRequest<EmailSendCodeRequest>): Promise<EmailSendCodeResponse> {
        try {
            const payload = req.body

            const potentialUser = await userService.findByEmail(payload.email)
            if (isNotNull(potentialUser)) {
                const discordAccount = await discordAccountService.findByOwnerIdentifier(potentialUser!.identifier)
                throwIfNotNull(discordAccount, Errors.CONFLICT_DiscordBind(potentialUser!.identifier))
            }

            const code = await verificationCodeService.createCode(payload.email, VerificationCodeTarget.BindDiscord)
            const mail = Email.generateBindDiscordMessage(mailer.config.from, payload.email, code)
            await mailer.send(mail, "verification code")
            res.status(200).json({
                userExists: isNotNull(potentialUser)
            })
        } catch (error) {
            next(error)
        }
    }

     async verifyCodeForDiscord(req: QueryRequest<EmailVerifyCodeRequest>): Promise<EmailVerifyCodeResponse> {
        try {
            const payload = req.query
            const verificationCode = parseInt(payload.verificationCode)
            await verificationCodeService.checkValidity(payload.email, verificationCode, VerificationCodeTarget.BindDiscord)
            res.status(200).json({
                email: payload.email,
                verificationCode: verificationCode,
                isValid: true
            })
        } catch (error) {
            next(error)
        }
    }

     async registerAndLogin(req: BodyRequest<DiscordRegisterRequest>): Promise<TokenResponse> {
        try {
            const payload = req.body
            await verificationCodeService.checkValidityAndDestroy(payload.email, payload.verificationCode, VerificationCodeTarget.BindDiscord)

            Password.validate(payload.password, payload.passwordConfirm)

            const validator = await discordValidatorService.getValidator(payload.requestNonce, payload.authKey)
            const discordUser = await DiscordClient.getUserMe(validator.discordToken)
            throwIfNull(discordUser.email, Errors.REQUIRE_DiscordEmail())
            const discordAccount = await discordAccountService.findByDiscordId(discordUser.id)
            throwIfNotNull(discordAccount, Errors.CONFLICT_DiscordNotAvailable(discordUser.id))

            const user = await userService.createUser(payload.email, payload.password, undefined)
            await discordAccountService.bindToUser(user.identifier, discordUser.id, validator.discordToken, discordUser.email!, validator.discordScope)

            await Auth.success(user, res)
        } catch (error) {
            next(error)
        }
    }

     async registerBindAndLogin(req: BodyRequest<DiscordRegisterBindRequest>): Promise<TokenResponse> {
        try {
            const payload = req.body

            await verificationCodeService.checkValidityAndDestroy(payload.email, payload.verificationCode, VerificationCodeTarget.BindDiscord)
            const user = await userService.getByEmail(payload.email)

            const discordAccount = await discordAccountService.findByOwnerIdentifier(user.identifier)
            throwIfNotNull(discordAccount, Errors.CONFLICT_DiscordBind(user.identifier))

            const validator = await discordValidatorService.getValidator(payload.requestNonce, payload.authKey)
            const discordUser = await DiscordClient.getUserMe(validator.discordToken)
            throwIfNull(discordUser.email, Errors.REQUIRE_DiscordEmail())
            await discordAccountService.bindToUser(user.identifier, discordUser.id, validator.discordToken, discordUser.email!, validator.discordScope)

            await Auth.success(user, res)
        } catch (error) {
            next(error)
        }
    }
}