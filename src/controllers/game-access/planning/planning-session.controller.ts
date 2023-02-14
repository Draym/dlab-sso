import {AuthBodyRequest, Empty, QueryRequest} from "../../../interfaces/api.interface"
import {NextFunction, Response} from "express"
import {
    SessionAllRequest, SessionAllResponse,
    SessionCreateRequest,
    SessionDeleteRequest, SessionFindNextRequest, SessionFindRequest, SessionGetRequest,
    SessionUpdateRequest
} from "../../../dtos/game-access/planning/session"
import {planningSessionService} from "../../../services"
import {isNotNull} from "../../../utils/validators/checks"
import {SessionOptionalResponse, SessionResponse} from "../../../dtos/game-access/planning"
import {nowUTC, toDate} from "../../../utils/date"

export default class PlanningSessionController {

     async create(req: AuthBodyRequest<SessionCreateRequest>): Promise<Empty> {
        try {
            const payload = req.body
            await planningSessionService.create(payload.type, toDate(payload.start), toDate(payload.end))
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

     async update(req: AuthBodyRequest<SessionUpdateRequest>): Promise<Empty> {
        try {
            const payload = req.body
            await planningSessionService.update(payload.id, toDate(payload.start), toDate(payload.end))
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

     async delete(req: AuthBodyRequest<SessionDeleteRequest>): Promise<SessionResponse> {
        try {
            const payload = req.body
            const deleted = await planningSessionService.delete(payload.id)
            res.status(200).json(deleted)
        } catch (error) {
            next(error)
        }
    }

     async all(req: QueryRequest<SessionAllRequest>): Promise<SessionAllResponse> {
        try {
            const payload = req.query
            const sessions = await planningSessionService.findSessions(payload.type)
            res.status(200).json({
                sessions: sessions
            })
        } catch (error) {
            next(error)
        }
    }

     async get(req: QueryRequest<SessionGetRequest>): Promise<SessionResponse> {
        try {
            const payload = req.query
            const session = await planningSessionService.getById(payload.id)
            res.status(200).json(session)
        } catch (error) {
            next(error)
        }
    }

     async find(req: QueryRequest<SessionFindRequest>): Promise<SessionOptionalResponse> {
        try {
            const payload = req.query
            const session = await planningSessionService.findSessionForDate(payload.type, toDate(payload.date))
            res.status(200).json({
                session: session
            })
        } catch (error) {
            next(error)
        }
    }

     async findNext(req: QueryRequest<SessionFindNextRequest>): Promise<SessionOptionalResponse> {
        try {
            const payload = req.query
            const session = await planningSessionService.findNext(
                payload.type,
                isNotNull(payload.date) ? toDate(payload.date!) : nowUTC()
            )
            res.status(200).json({
                session: session
            })
        } catch (error) {
            next(error)
        }
    }
}