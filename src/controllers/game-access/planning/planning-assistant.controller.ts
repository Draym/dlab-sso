import {AuthBodyRequest} from "../../../interfaces/api.interface"
import {NextFunction, Response} from "express"
import {
    AssistantCreateSessionRequest,
    AssistantCreateSessionResponse, AssistantDeleteSessionRequest, AssistantDeleteSessionResponse
} from "../../../dtos/game-access/planning/assistant"
import {planningAssistantService} from "../../../services"
import {toDate} from "../../../utils/date"

export default class PlanningAssistantController {

     async create(req: AuthBodyRequest<AssistantCreateSessionRequest>): Promise<AssistantCreateSessionResponse> {
        try {
            const payload = req.body
            const sessions = await planningAssistantService.createBatch(payload.type, toDate(payload.from), toDate(payload.to), payload.startTime, payload.endTime, payload.dayPicker, payload.ignoreConflicts)
            res.status(200).json({
                sessions: sessions
            })
        } catch (error) {
            next(error)
        }
    }

     async delete(req: AuthBodyRequest<AssistantDeleteSessionRequest>): Promise<AssistantDeleteSessionResponse> {
        try {
            const payload = req.body
            const sessions = await planningAssistantService.deleteBatch(payload.type, toDate(payload.from), toDate(payload.to))
            res.status(200).json({
                sessions: sessions
            })
        } catch (error) {
            next(error)
        }
    }
}