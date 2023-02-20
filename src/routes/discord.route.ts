import {DiscordController} from "../controllers/discord/discord.controller"
import {Router} from "express"
import authMiddleware from "../middleware/auth.middleware"
import {ApiAccessType, ApiModule, Endpoint} from "../enums"
import {validateRequest} from "../middleware/validate-request.middleware"
import {ApiScopeImpl, handle} from "@d-lab/api-kit"
import {DiscordAccountBindRequest} from "../api/dtos/auth/oauth/discord"

const router = Router()
const ctrl = new DiscordController()

const scope = ApiScopeImpl.default(ApiModule.Discord, ApiAccessType.Personal)

router.get(Endpoint.DISCORD_Details, authMiddleware(scope), handle.bind(ctrl.details))
router.delete(Endpoint.DISCORD_Unbind, authMiddleware(scope), handle.bind(ctrl.unbindAccount))
router.post(Endpoint.DISCORD_Bind, validateRequest(DiscordAccountBindRequest), authMiddleware(scope), handle.bind(ctrl.bindToAccount))

export default router
