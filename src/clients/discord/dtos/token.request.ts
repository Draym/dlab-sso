export default interface DiscordTokenRequest {
    client_id: string
    client_secret: string
    code: string
    grant_type: string
    redirect_uri: string
}