import {
    AssistantCreateSessionRequest,
    AssistantCreateSessionResponse, AssistantDeleteSessionRequest, AssistantDeleteSessionResponse
} from "../../../api/dtos/game-access/planning/assistant"
import {planningAssistantService} from "../../../services"
import {AuthBodyRequest, toDate} from "@d-lab/api-kit"

export default class PlanningAssistantController {

    async create(req: AuthBodyRequest<AssistantCreateSessionRequest>): Promise<AssistantCreateSessionResponse> {
        const payload = req.body
        const sessions = await planningAssistantService.createBatch(payload.serviceUuid, payload.type, toDate(payload.from), toDate(payload.to), payload.startTime, payload.endTime, payload.dayPicker, payload.ignoreConflicts)
        return {
            sessions: sessions
        }
    }

    async delete(req: AuthBodyRequest<AssistantDeleteSessionRequest>): Promise<AssistantDeleteSessionResponse> {
        const payload = req.body
        const sessions = await planningAssistantService.deleteBatch(payload.serviceUuid, payload.type, toDate(payload.from), toDate(payload.to))
        return {
            sessions: sessions
        }
    }
}