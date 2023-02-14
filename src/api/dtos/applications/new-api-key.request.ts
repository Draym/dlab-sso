import {IsInt} from "class-validator"

export default class ApplicationNewApiKeyRequest {
    @IsInt()
    applicationId: number
}