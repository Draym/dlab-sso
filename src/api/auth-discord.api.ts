import {
    DiscordGetAuthorizeResponse, DiscordGetAuthorizeUrlRequest,
    DiscordLoginRequest
} from "./dtos/auth/oauth/discord"
import {BodyRequest, QueryRequest} from "@d-lab/api-kit"
import {TokenResponse} from "./dtos/auth"
import {Response} from "express"

export default interface OAuthDiscordApi {
     getAuthorizeURL(req: QueryRequest<DiscordGetAuthorizeUrlRequest>): Promise<DiscordGetAuthorizeResponse>
     authenticateAndLogin(req: BodyRequest<DiscordLoginRequest>, res: Response): Promise<TokenResponse>
}