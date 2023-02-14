export default interface DiscordApplicationResponse {
    id: string,
    name: string,
    icon: string,
    description: string,
    hook: boolean,
    bot_public: boolean,
    bot_require_code_grant: boolean,
    verify_key: string
}