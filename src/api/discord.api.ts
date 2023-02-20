import {DiscordMeResponse} from "./dtos/discord"
import {DiscordAccountBindRequest} from "./dtos/auth/oauth/discord"
import {AuthBodyRequest, AuthRequest} from "@d-lab/api-kit"

export interface DiscordApi {
     details(req: AuthRequest): Promise<DiscordMeResponse>
     bindToAccount(req: AuthBodyRequest<DiscordAccountBindRequest>): Promise<void>
     unbindAccount(req: AuthRequest): Promise<void>
}