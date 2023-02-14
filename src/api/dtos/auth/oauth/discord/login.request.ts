import {IsString} from "class-validator"

export default class DiscordLoginRequest {
    @IsString()
    code: string
    @IsString()
    requestNonce: string
    @IsString()
    redirectUri: string
}