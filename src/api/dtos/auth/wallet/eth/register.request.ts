import {
    IsEthereumAddress,
    IsString,
} from "class-validator"

export default class EthRegisterRequest {
    @IsEthereumAddress()
    public walletAddress: string
    @IsString()
    public signature: string
}