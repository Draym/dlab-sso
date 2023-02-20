import {
    AssistantCreateSessionRequest,
    AssistantCreateSessionResponse, AssistantDeleteSessionRequest, AssistantDeleteSessionResponse
} from "./dtos/game-access/planning/assistant"
import {AuthBodyRequest} from "@d-lab/api-kit"

export default interface PlanningAssistantApi {
     create(req: AuthBodyRequest<AssistantCreateSessionRequest>): Promise<AssistantCreateSessionResponse>
     delete(req: AuthBodyRequest<AssistantDeleteSessionRequest>): Promise<AssistantDeleteSessionResponse>
}