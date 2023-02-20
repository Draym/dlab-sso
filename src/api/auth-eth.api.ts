import {
    EthChallengeRequest,
    EthChallengeResponse,
    EthLoginRequest,
} from "./dtos/auth/wallet/eth"
import {BodyRequest} from "@d-lab/api-kit"
import {TokenResponse} from "./dtos/auth"
import {Response} from "express"

export default interface AuthWalletEthApi {
     loginChallenge(req: BodyRequest<EthChallengeRequest>): Promise<EthChallengeResponse>
     login(req: BodyRequest<EthLoginRequest>, res: Response): Promise<TokenResponse>
}