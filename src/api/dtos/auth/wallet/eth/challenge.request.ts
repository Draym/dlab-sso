import {IsEthereumAddress} from "class-validator"

export default class EthChallengeRequest {
    @IsEthereumAddress()
    public walletAddress: string
}