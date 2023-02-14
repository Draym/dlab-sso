export default interface DiscordValidator {
    id: number
    discordId: string
    discordToken: string
    discordScope: string
    requestNonce: string
    authKey: string
    createdAt: Date
    updatedAt: Date
}
