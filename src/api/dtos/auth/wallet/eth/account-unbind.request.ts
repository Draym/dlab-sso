import {IsEthereumAddress, IsString} from "class-validator"

export default class EthAccountUnbindRequest {
    @IsEthereumAddress()
    public walletAddress: string
    @IsString()
    public signature: string
}