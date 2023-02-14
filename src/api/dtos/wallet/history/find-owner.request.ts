import {IsDateString, IsEthereumAddress, ValidateIf} from "class-validator"
import {isNotEmpty} from "@d-lab/api-kit"

export default class FindWalletOwnerRequest {
    @IsEthereumAddress()
    public walletAddress: string
    @ValidateIf((object, value) => isNotEmpty(value))
    @IsDateString(undefined, {message: "Invalid date format."})
    public at: string | null
}