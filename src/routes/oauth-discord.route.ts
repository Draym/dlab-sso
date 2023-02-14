import {Router} from "express"
import {validateQueryRequest, validateRequest} from "../middleware/validate-request.middleware"
import {Endpoint} from "../enums"
import OAuthDiscordController from "../controllers/auth/oauth/discord.controller"
import {
    DiscordLoginRequest,
    DiscordRegisterBindRequest,
    DiscordRegisterRequest
} from "../dtos/reponse/oauth/discord"
import {EmailSendCodeRequest, EmailVerifyCodeRequest} from "../dtos/email"

const router = Router()
const controller = new OAuthDiscordController()



router.post(Endpoint.OAUTH_DISCORD_Login, validateRequest(DiscordLoginRequest), controller.authenticateAndLogin)

router.post(Endpoint.OAUTH_DISCORD_EMAIL_RequestCode, validateRequest(EmailSendCodeRequest), controller.sendCodeForDiscord)

router.get(Endpoint.OAUTH_DISCORD_EMAIL_VerifyCode, validateQueryRequest(EmailVerifyCodeRequest), controller.verifyCodeForDiscord)

router.post(Endpoint.OAUTH_DISCORD_Register, validateRequest(DiscordRegisterRequest), controller.registerAndLogin)

router.post(Endpoint.OAUTH_DISCORD_RegisterBind, validateRequest(DiscordRegisterBindRequest), controller.registerBindAndLogin)

router.get(Endpoint.OAUTH_DISCORD_AuthorizeURL, controller.getAuthorizeURL)

export default router
