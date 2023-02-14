import {discordAccountService, discordValidatorService} from "../../services"
import {DiscordMeResponse} from "../../api/dtos/discord"
import {DiscordAccountBindRequest} from "../../api/dtos/auth/oauth/discord"
import DiscordClient from "../../clients/discord/discord.client"
import Errors from "../../utils/errors/Errors"
import {AuthBodyRequest, AuthRequest, throwIfNull} from "@d-lab/api-kit"

export class DiscordController {
    async me(req: AuthRequest): Promise<DiscordMeResponse> {
        const caller = req.caller
        const account = await discordAccountService.getByUuid(caller.uuid)

        return {
            email: account.discordEmail,
            discordId: account.discordId
        }
    }

    async bindToAccount(req: AuthBodyRequest<DiscordAccountBindRequest>): Promise<void> {
        const caller = req.caller
        const payload = req.body
        const validator = await discordValidatorService.getValidator(payload.requestNonce!, payload.authKey!)
        const discordUser = await DiscordClient.getUserMe(validator.discordToken)
        throwIfNull(discordUser.email, Errors.REQUIRE_DiscordEmail())
        await discordAccountService.bindToUser(caller.uuid, discordUser.id, validator.discordToken, discordUser.email!, validator.discordScope)
    }

    async unbindAccount(req: AuthRequest): Promise<void> {
        const caller = req.caller
        await discordAccountService.unbindFromUser(caller.uuid)
    }
}