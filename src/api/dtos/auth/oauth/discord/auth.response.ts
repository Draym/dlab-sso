import TokenResponse from "../../token.response"

export interface RequireAccountResponse {
    discordEmail: string | null,
    authKey: string
}

export default interface DiscordAuthResponse {
    requireAccount: boolean
    account: RequireAccountResponse | null,
    token: TokenResponse | null
}