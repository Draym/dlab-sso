import {discordAccountService, discordValidatorService} from "../../services"
import {DiscordMeResponse} from "../../api/dtos/discord"
import {DiscordAccountBindRequest} from "../../api/dtos/auth/oauth/discord"
import DiscordClient from "../../clients/discord/discord.client"
import Errors from "../../utils/errors/Errors"
import {AuthBodyRequest, AuthRequest, eq, throwIfNull} from "@d-lab/api-kit"

export class DiscordController {
    async details(req: AuthRequest): Promise<DiscordMeResponse> {
        const caller = req.caller
        const account = await discordAccountService.getBy(eq({userId: caller.id}))

        return {
            email: account.discordEmail,
            discordId: account.discordId
        }
    }

    async bindToAccount(req: AuthBodyRequest<DiscordAccountBindRequest>): Promise<void> {
        const caller = req.caller
        const payload = req.body
        const validator = await discordValidatorService.getBy(eq({
            requestNonce: payload.requestNonce!,
            authKey: payload.authKey!
        }))
        const discordUser = await DiscordClient.getUserMe(validator.discordToken)
        throwIfNull(discordUser.email, Errors.REQUIRE_DiscordEmail())
        await discordAccountService.bindToUser(caller.id, discordUser.id, validator.discordToken, discordUser.email!, validator.discordScope)
    }

    async unbindAccount(req: AuthRequest): Promise<void> {
        const caller = req.caller
        await discordAccountService.unbindFromUser(caller.id)
    }
}