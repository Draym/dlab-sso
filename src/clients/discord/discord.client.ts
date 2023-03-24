import {DiscordAutMeResponse, DiscordTokenRequest, DiscordTokenResponse, DiscordUserResponse} from "./dtos"
import {Auth, Http} from "@d-lab/common-kit"

enum API {
    AUTHORIZE = "https://discord.com/api/v10/oauth2/authorize",
    AUTH_TOKEN = "https://discord.com/api/v10/oauth2/token",
    AUTH_ME = "https://discord.com/api/v10/oauth2/@me",
    USERS_ME = "https://discord.com/api/v10/users/@me"
}

export default class DiscordClient {
    private static appId: string = process.env.DISCORD_APP_ID!
    private static appKey: string = process.env.DISCORD_APP_KEY!
    private static secret: string = process.env.DISCORD_CLIENT_SECRET!

    public static getRequiredScopes(): string[] {
        return ["identify", "connections", "email"]
    }

    public static getAuthorizeURL(scopes: string[], nonce: string, redirectUri: string, requireConsent = false) {
        const prompt = requireConsent ? "consent" : "none"
        const scope = scopes.join("%20")
        return `${API.AUTHORIZE}?response_type=code&client_id=${this.appId}&scope=${scope}&state=${nonce}&redirect_uri=${encodeURIComponent(redirectUri)}&prompt=${prompt}`
    }

    public static async authenticateUser(code: string, redirectUri: string): Promise<DiscordTokenResponse> {
        const data: DiscordTokenRequest = {
            client_id: this.appId,
            client_secret: this.secret,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: redirectUri
        }
        return new Promise((resolve, reject) => {
            Http.post<DiscordTokenResponse>(null, API.AUTH_TOKEN, null, {body: data}, (r) => {
                resolve(r)
            }, (error) => {
                reject(error.message)
            }, "application/x-www-form-urlencoded")
        })
    }

    public static async getAuthMe(token: string): Promise<DiscordAutMeResponse> {
        return new Promise((resolve, reject) => {
            Http.get<DiscordAutMeResponse>(null, API.AUTH_ME, Auth.token(token), {}, (r) => {
                resolve(r)
            }, (error) => {
                reject(error.message)
            })
        })
    }

    public static async getUserMe(token: string): Promise<DiscordUserResponse> {
        return new Promise((resolve, reject) => {
            Http.get<DiscordUserResponse>(null, API.USERS_ME, Auth.token(token), {}, (r) => {
                resolve(r)
            }, (error) => {
                reject(error.message)
            })
        })
    }
}