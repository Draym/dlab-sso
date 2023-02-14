import {IsString} from "class-validator"

export default class DiscordGetAuthorizeUrlRequest{
    @IsString()
    redirectUri: string
}