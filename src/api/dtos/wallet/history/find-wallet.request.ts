import {IsDateString, IsInt, ValidateIf} from "class-validator"
import {isNotEmpty} from "@d-lab/api-kit"

export default class FindWalletRequest {
    @IsInt()
    public userId: number
    @ValidateIf((object, value) => isNotEmpty(value))
    @IsDateString(undefined, {message: "Invalid date format."})
    public at: string | null
}