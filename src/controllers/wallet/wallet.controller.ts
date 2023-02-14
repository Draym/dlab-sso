import {AuthQueryRequest} from "../../interfaces/api.interface"
import {NextFunction, Response} from "express"
import {
    FindWalletOwnerRequest,
    FindWalletOwnerResponse,
    FindWalletRequest,
    FindWalletResponse
} from "../../dtos/wallet/history"
import {userService, walletHistoryService} from "../../services"
import {WalletType} from "../../enums"
import {isNotNull} from "../../utils/validators/checks"
import {UserResponse} from "../../dtos/wallet/history/find-owner.response"

export default class WalletController {
     async findOwner(req: AuthQueryRequest<FindWalletOwnerRequest>): Promise<FindWalletOwnerResponse> {
        try {
            const payload = req.query

            const at = isNotNull(payload.at) ? new Date(payload.at!) : new Date()
            const history = await walletHistoryService.findByWallet(payload.walletAddress, WalletType.ETH, at)
            let owner: UserResponse | null = null

            if (isNotNull(history)) {
                const user = await userService.getByIdentifier(history!.ownerIdentifier)
                owner = {
                    email: user.email,
                    identifier: user.identifier
                }
            }

            res.status(200).json({
                walletAddress: payload.walletAddress,
                user: owner
            })
        } catch (error) {
            next(error)
        }
    }

     async findWallet(req: AuthQueryRequest<FindWalletRequest>): Promise<FindWalletResponse> {
        try {
            const payload = req.query

            const at = isNotNull(payload.at) ? new Date(payload.at!) : new Date()
            const history = await walletHistoryService.findByOwner(payload.userIdentifier, WalletType.ETH, at)

            res.status(200).json({
                userUuid: payload.userIdentifier,
                walletAddress: history?.address || null
            })
        } catch (error) {
            next(error)
        }
    }
}