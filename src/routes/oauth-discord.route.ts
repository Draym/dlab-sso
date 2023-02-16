import {Router} from "express"
import {validateRequest} from "../middleware/validate-request.middleware"
import {Endpoint} from "../enums"
import OAuthDiscordController from "../controllers/auth/oauth/discord.controller"
import {handle} from "@d-lab/api-kit"
import {DiscordLoginRequest} from "../api/dtos/auth/oauth/discord"

const router = Router()
const ctrl = new OAuthDiscordController()

router.post(Endpoint.OAUTH_DISCORD_Login, validateRequest(DiscordLoginRequest), handle.bind(ctrl.authenticateAndLogin))
router.get(Endpoint.OAUTH_DISCORD_AuthorizeURL, handle.bind(ctrl.getAuthorizeURL))

export default router
