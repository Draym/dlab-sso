import {PbeIsAuthorizedRequest, PbeIsAuthorizedResponse} from "../../../api/dtos/game-access/pbe"
import {pbeAccessService} from "../../../services"
import {AuthRequest, QueryRequest} from "@d-lab/api-kit"
import PbeApi from "../../../api/pbe.api"

export default class PbeController implements PbeApi {

    async isAuthorizedByEmail(req: QueryRequest<PbeIsAuthorizedRequest>): Promise<PbeIsAuthorizedResponse> {
        const payload = req.query
        const {isAuthorized, isOpen, isPBETester, isStaff} = await pbeAccessService.isAuthorizedByEmail(payload.email)
        return {
            authorized: isAuthorized,
            isOpen: isOpen,
            isPBETester: isPBETester,
            isStaff: isStaff
        }
    }

    async isAuthorized(req: AuthRequest): Promise<PbeIsAuthorizedResponse> {
        const caller = req.caller
        const {isAuthorized, isOpen, isPBETester, isStaff} = await pbeAccessService.isAuthorizedByUuid(caller.uuid)
        return {
            authorized: isAuthorized,
            isOpen: isOpen,
            isPBETester: isPBETester,
            isStaff: isStaff
        }
    }
}