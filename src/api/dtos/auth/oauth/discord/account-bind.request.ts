import {IsString} from "class-validator"

export default class DiscordAccountBindRequest {
    @IsString()
    authKey: string
    @IsString()
    requestNonce: string
    @IsString()
    redirectUri: string
}