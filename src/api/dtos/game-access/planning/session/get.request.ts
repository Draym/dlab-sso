import {IsNumberString} from "class-validator"

export default class SessionGetRequest {
    @IsNumberString()
    public id: number
}