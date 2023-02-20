import {
    FindWalletOwnerRequest,
    FindWalletOwnerResponse,
    FindWalletRequest,
    FindWalletResponse
} from "./dtos/wallet/history"
import {AuthQueryRequest} from "@d-lab/api-kit"

export default interface WalletApi {
     findOwner(req: AuthQueryRequest<FindWalletOwnerRequest>): Promise<FindWalletOwnerResponse>
     findWallet(req: AuthQueryRequest<FindWalletRequest>): Promise<FindWalletResponse>
}