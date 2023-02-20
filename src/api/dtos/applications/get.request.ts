import {IsNumberString} from "class-validator"

export default class ApplicationGetRequest {
    @IsNumberString()
    id: string
}