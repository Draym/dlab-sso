import {AuthRequest, Empty, AuthBodyRequest} from "../../../interfaces/api.interface"
import {NextFunction, Response} from "express"
import {
    WhitelistUserAddByWalletRequest,
    WhitelistUserAddRequest,
    WhitelistUserAllResponse,
    WhitelistUserDeleteRequest
} from "../../../dtos/game-access/whitelist"
import {whitelistService} from "../../../services"
import {sequelize} from "../../../db/database"
import {isNotNull} from "../../../utils/validators/checks"
import WhitelistUserAddByWalletResponse from "../../../dtos/game-access/whitelist/user/add-by-wallet.response"


export default class WhitelistUserController {

     async all(req: AuthRequest): Promise<WhitelistUserAllResponse> {
        try {
            const whitelistedUsers = await whitelistService.getAll()
            const status = await whitelistService.getStatus()
            res.status(200).json({
                emails: whitelistedUsers.map(user => user.email),
                whitelistStatus: status
            })
        } catch (error) {
            next(error)
        }
    }

     async add(req: AuthBodyRequest<WhitelistUserAddRequest>): Promise<Empty> {
        try {
            const payload = req.body
            await whitelistService.addEmails(payload.emails)
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

     async addByWallet(req: AuthBodyRequest<WhitelistUserAddByWalletRequest>): Promise<WhitelistUserAddByWalletResponse> {
        try {
            const payload = req.body
            const uniqueAddresses = Array.from(new Set(payload.addresses))

            const query = `SELECT user.email, wlt.address FROM wallets wlt INNER JOIN users user ON wlt.owner_identifier = user.identifier where wlt.address IN ('${uniqueAddresses.join("','")}')`
            const [results, _] = await sequelize.query(query)
            const emails: string[] = []
            const validAddresses: string[] = []
            results.filter(isNotNull).forEach((it: any) => {
                emails.push(it.email)
                validAddresses.push(it.address)
            })
            await whitelistService.addEmails(emails)
            res.status(200).json({
                invalidAddresses: uniqueAddresses.filter(item => validAddresses.indexOf(item) < 0)
            })
        } catch (error) {
            next(error)
        }
    }

     async delete(req: AuthBodyRequest<WhitelistUserDeleteRequest>): Promise<Empty> {
        try {
            const payload = req.body
            await whitelistService.deleteEmails(payload.emails)
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

     async deleteAll(req: AuthRequest): Promise<Empty> {
        try {
            await whitelistService.deleteAllEmails()
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }
}