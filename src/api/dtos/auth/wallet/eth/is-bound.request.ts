import {IsEthereumAddress} from "class-validator"

export default class EthIsBoundRequest {
    @IsEthereumAddress()
    public walletAddress: string
}