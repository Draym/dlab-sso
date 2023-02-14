import {IsInt} from "class-validator"

export default class ApplicationDeleteRequest {
    @IsInt()
    applicationId: number
}