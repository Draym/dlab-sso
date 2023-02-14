import {IsEthereumAddress, IsString} from "class-validator"

export default class EthLoginRequest {
    @IsEthereumAddress()
    public walletAddress: string
    @IsString()
    public signature: string
}