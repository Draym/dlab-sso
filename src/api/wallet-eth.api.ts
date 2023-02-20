import {
    EthAccountBindRequest, EthAccountUnbindRequest,
    EthChallengeRequest,
    EthChallengeResponse,
    EthIsBoundRequest,
    EthIsBoundResponse
} from "./dtos/auth/wallet/eth"
import {AuthBodyRequest, BodyRequest, QueryRequest} from "@d-lab/api-kit"

export default interface WalletEthApi {
     bindAccountChallenge(req: AuthBodyRequest<EthChallengeRequest>): Promise<EthChallengeResponse>
     isBound(req: QueryRequest<EthIsBoundRequest>): Promise<EthIsBoundResponse>
     bindToAccount(req: AuthBodyRequest<EthAccountBindRequest>): Promise<void>
     unbindAccountChallenge(req: BodyRequest<EthChallengeRequest>): Promise<EthChallengeResponse>
     unbindFromAccount(req: AuthBodyRequest<EthAccountUnbindRequest>): Promise<void>
}