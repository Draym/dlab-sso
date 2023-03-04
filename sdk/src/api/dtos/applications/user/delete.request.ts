import {IsNumber} from "class-validator"

export default class AppUserDeleteRequest {
    @IsNumber()
    public applicationId: number
    @IsNumber()
    public userId: number
}