import {
    SessionAllRequest,
    SessionAllResponse,
    SessionCreateRequest,
    SessionDeleteRequest,
    SessionFindNextRequest,
    SessionGetRequest,
    SessionUpdateRequest
} from "../../../api/dtos/game-access/planning/session"
import {planningSessionService} from "../../../services"
import {AuthBodyRequest, Filter, PathRequest, QueryRequest} from "@d-lab/api-kit"
import {SessionOptionalResponse, SessionDto} from "../../../api/dtos/game-access/planning"
import PlanningSessionApi from "../../../api/planning-session.api"
import {isNotNull, nowUTC, toDate, toOptDate} from "@d-lab/common-kit"

export default class PlanningSessionController implements PlanningSessionApi {

    async create(req: AuthBodyRequest<SessionCreateRequest>): Promise<void> {
        const payload = req.body
        await planningSessionService.create(payload.serviceId, payload.type, toDate(payload.start), toDate(payload.end))
    }

    async update(req: AuthBodyRequest<SessionUpdateRequest>): Promise<void> {
        const payload = req.body
        await planningSessionService.update(payload.id, toDate(payload.start), toDate(payload.end))
    }

    async delete(req: AuthBodyRequest<SessionDeleteRequest>): Promise<SessionDto> {
        const payload = req.body
        return await planningSessionService.delete(payload.id)
    }

    async all(req: QueryRequest<SessionAllRequest>): Promise<SessionAllResponse> {
        const payload = req.query
        const filter = new Filter()
        filter.equals({type: payload.type})
        filter.gt({date: toOptDate(payload.dateAfter)})
        filter.lt({date: toOptDate(payload.dateBefore)})
        const sessions = await planningSessionService.findAll(filter)
        return {
            sessions: sessions
        }
    }

    async get(req: PathRequest<SessionGetRequest>): Promise<SessionDto> {
        const payload = req.params
        return await planningSessionService.get(payload.id)
    }

    async findNext(req: QueryRequest<SessionFindNextRequest>): Promise<SessionOptionalResponse> {
        const payload = req.query
        const session = await planningSessionService.findNext(
            payload.type,
            isNotNull(payload.date) ? toDate(payload.date!) : nowUTC()
        )
        return {
            session: session
        }
    }
}