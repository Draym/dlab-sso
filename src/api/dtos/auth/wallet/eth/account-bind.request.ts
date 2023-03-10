import {IsEthereumAddress, IsString} from "class-validator"

export default class EthAccountBindRequest {
    @IsEthereumAddress()
    public walletAddress: string
    @IsString()
    public signature: string
}