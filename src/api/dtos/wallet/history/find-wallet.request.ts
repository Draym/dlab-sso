import {IsDateString, IsUUID, ValidateIf} from "class-validator"
import {isNotEmpty} from "@d-lab/api-kit"

export default class FindWalletRequest {
    @IsUUID()
    public userIdentifier: string
    @ValidateIf((object, value) => isNotEmpty(value))
    @IsDateString(undefined, {message: "Invalid date format."})
    public at: string | null
}