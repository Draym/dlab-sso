import {PlanningGetRequest, PlanningGetResponse} from "../../../api/dtos/game-access/planning"
import {planningSessionService} from "../../../services"
import {Filter, QueryRequest, toOptDate} from "@d-lab/api-kit"
import PlanningApi from "../../../api/planning.api"

export default class PlanningController implements PlanningApi {
    async get(req: QueryRequest<PlanningGetRequest>): Promise<PlanningGetResponse> {
        const payload = req.query
        const filter = new Filter()
        filter.equals({type: payload.type})
        filter.gt({start: toOptDate(payload.after)})
        const sessions = await planningSessionService.findAll(filter)

        return {
            sessions: sessions
        }
    }
}