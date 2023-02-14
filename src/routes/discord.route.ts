import {DiscordController} from "../controllers/discord/discord.controller"
import {Router} from "express"
import authMiddleware from "../middleware/auth.middleware"
import {ApiScopeImpl} from "./api.scope"
import {ApiAccessType, ApiModule, Endpoint} from "../enums"
import {validateRequest} from "../middleware/validate-request.middleware"
import {DiscordBindToAccountRequest} from "../dtos/reponse/oauth/discord"

const router = Router()
const controller = new DiscordController()

const scope = ApiScopeImpl.default(ApiModule.Discord, ApiAccessType.Personal)



router.get(Endpoint.DISCORD_Me, authMiddleware(scope),controller.me)

router.delete(Endpoint.DISCORD_Unbind, authMiddleware(scope), controller.unbindAccount)

router.post(Endpoint.DISCORD_Bind, validateRequest(DiscordBindToAccountRequest), authMiddleware(scope), controller.bindToAccount)

export default router
