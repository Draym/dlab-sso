import {PbeIsAuthorizedRequest, PbeIsAuthorizedResponse} from "./dtos/game-access/pbe"
import {AuthRequest, QueryRequest} from "@d-lab/api-kit"

export default interface PbeApi {
     isAuthorizedByEmail(req: QueryRequest<PbeIsAuthorizedRequest>): Promise<PbeIsAuthorizedResponse>
     isAuthorized(req: AuthRequest): Promise<PbeIsAuthorizedResponse>
}