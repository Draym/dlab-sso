import {
    SessionAllRequest,
    SessionAllResponse,
    SessionCreateRequest,
    SessionDeleteRequest,
    SessionFindNextRequest,
    SessionGetRequest,
    SessionUpdateRequest
} from "./dtos/game-access/planning/session"
import {AuthBodyRequest, PathRequest, QueryRequest} from "@d-lab/api-kit"
import {SessionOptionalResponse, SessionDto} from "./dtos/game-access/planning"

export default interface PlanningSessionApi {
     create(req: AuthBodyRequest<SessionCreateRequest>): Promise<void>
     update(req: AuthBodyRequest<SessionUpdateRequest>): Promise<void>
     delete(req: AuthBodyRequest<SessionDeleteRequest>): Promise<SessionDto>
     all(req: QueryRequest<SessionAllRequest>): Promise<SessionAllResponse>
     get(req: PathRequest<SessionGetRequest>): Promise<SessionDto>
     findNext(req: QueryRequest<SessionFindNextRequest>): Promise<SessionOptionalResponse>
}