import {
    FindWalletOwnerRequest,
    FindWalletOwnerResponse,
    FindWalletRequest,
    FindWalletResponse,
    WalletUserDto
} from "../../api/dtos/wallet/history"
import {userService, walletHistoryService} from "../../services"
import {WalletType} from "../../enums"
import {AuthQueryRequest} from "@d-lab/api-kit"
import WalletApi from "../../api/wallet.api"
import {isNotNull} from "@d-lab/common-kit"

export default class WalletController implements WalletApi {
    async findOwner(req: AuthQueryRequest<FindWalletOwnerRequest>): Promise<FindWalletOwnerResponse> {
        const payload = req.query

        const at = isNotNull(payload.at) ? new Date(payload.at!) : new Date()
        const history = await walletHistoryService.findByWallet(payload.walletAddress, WalletType.ETH, at)
        let owner: WalletUserDto | null = null

        if (isNotNull(history)) {
            const user = await userService.get(history!.userId)
            owner = {
                email: user.email,
                uuid: user.uuid
            }
        }

        return {
            walletAddress: payload.walletAddress,
            user: owner
        }
    }

    async findWallet(req: AuthQueryRequest<FindWalletRequest>): Promise<FindWalletResponse> {
        const payload = req.query

        const at = isNotNull(payload.at) ? new Date(payload.at!) : new Date()
        const history = await walletHistoryService.findByOwner(payload.userId, WalletType.ETH, at)

        return {
            userId: payload.userId,
            walletAddress: history?.address || null
        }
    }
}