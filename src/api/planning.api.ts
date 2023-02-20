import {PlanningGetRequest, PlanningGetResponse} from "./dtos/game-access/planning"
import {QueryRequest} from "@d-lab/api-kit"

export default interface PlanningApi {
     get(req: QueryRequest<PlanningGetRequest>): Promise<PlanningGetResponse>
}