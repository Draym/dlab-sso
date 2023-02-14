import {QueryRequest} from "../../../interfaces/api.interface"
import {NextFunction, Response} from "express"
import {PlanningGetRequest, PlanningGetResponse} from "../../../dtos/game-access/planning"
import {planningSessionService} from "../../../services"
import {toOptDate} from "../../../utils/date"

export default class PlanningController {
     async get(req: QueryRequest<PlanningGetRequest>): Promise<PlanningGetResponse> {
        try {
            const payload = req.query

            let sessions = await planningSessionService.findSessions(payload.type, undefined, toOptDate(payload.after))

            res.status(200).json({
                sessions: sessions
            })
        } catch (error) {
            next(error)
        }
    }
}