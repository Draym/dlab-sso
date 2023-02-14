export default interface DiscordAccount {
    id: number
    discordId: string
    discordToken: string
    discordEmail: string
    userUuid: string
    scopes: string
    createdAt: Date
    updatedAt: Date
}
