import {IsEnum, IsEthereumAddress} from "class-validator"
import ChallengeTopic from "../../../../../enums/challenge-topic.enum"

export default class EthChallengeRequest {
    @IsEthereumAddress()
    public walletAddress: string
    @IsEnum(ChallengeTopic)
    public topic: ChallengeTopic
}