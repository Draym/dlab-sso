import {QueryRequest} from "../../../interfaces/api.interface"
import {NextFunction, Response} from "express"
import {EarlyAccessIsAuthorizedRequest, EarlyAccessIsAuthorizedResponse} from "../../../dtos/game-access/earlyaccess"
import {pbeAccessService} from "../../../services"

export default class EarlyAccessController {

     async isAuthorized(req: QueryRequest<EarlyAccessIsAuthorizedRequest>): Promise<EarlyAccessIsAuthorizedResponse> {
        try {
            const payload = req.query

            const {isAuthorized, isOpen, isPBETester, isStaff} = await pbeAccessService.isAuthorized(payload.email)

            res.status(200).json({
                authorized: isAuthorized,
                isOpen: isOpen,
                isPBETester: isPBETester,
                isStaff: isStaff
            })
        } catch (error) {
            next(error)
        }
    }
}