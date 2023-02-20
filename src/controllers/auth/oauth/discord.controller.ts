import {
    DiscordGetAuthorizeResponse, DiscordGetAuthorizeUrlRequest,
    DiscordLoginRequest
} from "../../../api/dtos/auth/oauth/discord"
import DiscordClient from "../../../clients/discord/discord.client"
import {
    discordAccountService,
    userService,
} from "../../../services"
import {nanoid} from "nanoid"
import Errors from "../../../utils/errors/Errors"
import {BodyRequest, eq, isNotNull, QueryRequest} from "@d-lab/api-kit"
import AuthResponse from "../../../utils/reponse/auth.response"
import {TokenResponse} from "../../../api/dtos/auth"
import {Response} from "express"
import {User} from "../../../interfaces"

export default class OAuthDiscordController {
    async getAuthorizeURL(req: QueryRequest<DiscordGetAuthorizeUrlRequest>): Promise<DiscordGetAuthorizeResponse> {
        const payload = req.query
        const nonce = nanoid()
        return {
            url: DiscordClient.getAuthorizeURL(DiscordClient.getRequiredScopes(), nonce, payload.redirectUri),
            requestNonce: nonce
        }
    }

    async authenticateAndLogin(req: BodyRequest<DiscordLoginRequest>, res: Response): Promise<TokenResponse> {
        const payload = req.body

        const discordToken = await DiscordClient.authenticateUser(payload.code, payload.redirectUri).catch(e => {
            throw Errors.SERVICE_PROVIDER_ApiError(e)
        })
        const discordUser = await DiscordClient.getUserMe(discordToken.access_token)
        const discordAccount = await discordAccountService.findBy(eq({discordId: discordUser.id}))

        let user: User
        if (isNotNull(discordAccount)) {
            user = await userService.get(discordAccount!.userId)
        } else {
            user = await userService.create(discordUser.email)
            await discordAccountService.bindToUser(user.id, discordUser.id, discordToken.access_token, discordUser.email!, discordToken.scope)
        }

        return await AuthResponse.success(user, res)
    }
}