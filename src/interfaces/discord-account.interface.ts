export default interface DiscordAccount {
    id: number
    discordId: string
    discordToken: string
    discordEmail: string
    userId: number
    scopes: string
    createdAt: Date
    updatedAt: Date
}
