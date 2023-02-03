import {IsNumberString} from "class-validator"

export default class GetRequest {
    @IsNumberString()
    userId: string
}