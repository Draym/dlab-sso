import {IsString} from "class-validator"

export default class DiscordRegisterRequest {
    @IsString()
    authKey: string
    @IsString()
    requestNonce: string
}