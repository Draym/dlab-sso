import {AuthRequest} from "../../../interfaces/api.interface"
import {NextFunction, Response} from "express"
import {WhitelistSessionAllResponse} from "../../../dtos/game-access/whitelist"
import {whitelistService, whitelistSessionService} from "../../../services"

export default class WhitelistSessionController {

     async all(req: AuthRequest): Promise<WhitelistSessionAllResponse> {
        try {
            const sessions = await whitelistSessionService.all()
            const status = await whitelistService.getStatus()
            res.status(200).json({
                sessions: sessions,
                whitelistStatus: status
            })
        } catch (error) {
            next(error)
        }
    }
}