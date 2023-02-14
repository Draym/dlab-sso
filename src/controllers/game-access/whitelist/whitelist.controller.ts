import {AuthRequest, Empty, EmptyRequest, QueryRequest} from "../../../interfaces/api.interface"
import {NextFunction, Response} from "express"
import {
    WhitelistFindRequest,
    WhitelistFindResponse,
    WhitelistIsAuthorizedRequest,
    WhitelistIsAuthorizedResponse,
    WhitelistStatusResponse
} from "../../../dtos/game-access/whitelist"
import {whitelistService} from "../../../services"

export default class WhitelistController {
     async find(req: QueryRequest<WhitelistFindRequest>): Promise<WhitelistFindResponse> {
        try {
            const payload = req.query
            const isWhitelisted = await whitelistService.isWhitelisted(payload.email)
            res.status(200).json({
                email: payload.email,
                isWhitelisted: isWhitelisted
            })
        } catch (error) {
            next(error)
        }
    }

     async isAuthorized(req: QueryRequest<WhitelistIsAuthorizedRequest>): Promise<WhitelistIsAuthorizedResponse> {
        try {
            const payload = req.query

            const {isStaff, isAuthorized, isWhitelisted, isOpen} = await whitelistService.isAuthorized(payload.email)

            res.status(200).json({
                authorized: isAuthorized,
                isWhitelisted: isWhitelisted,
                isStaff: isStaff,
                isOpen: isOpen
            })
        } catch (error) {
            next(error)
        }
    }

     async status(req: EmptyRequest): Promise<WhitelistStatusResponse> {
        try {
            const status = await whitelistService.getStatus()
            res.status(200).json({
                status: status
            })
        } catch (error) {
            next(error)
        }
    }

     async activate(req: AuthRequest): Promise<Empty> {
        try {
            await whitelistService.activate()
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

     async close(req: AuthRequest): Promise<Empty> {
        try {
            await whitelistService.close()
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

     async openForAll(req: AuthRequest): Promise<Empty> {
        try {
            await whitelistService.openForAll()
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }
}