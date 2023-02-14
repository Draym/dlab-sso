import DiscordApplicationResponse from "./application.response"
import DiscordUserResponse from "./user.response"

export default interface DiscordAutMeResponse {
    application: DiscordApplicationResponse,
    scopes: string[],
    expires: string,
    user: DiscordUserResponse
}