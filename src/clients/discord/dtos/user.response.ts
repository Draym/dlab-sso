export default interface DiscordUserResponse {
    id: string,
    username: string,
    email: string | null,
    avatar: string,
    discriminator: string,
    public_flags: number
}