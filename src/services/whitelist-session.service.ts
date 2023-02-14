import {SessionType} from "../enums"
import {planningSessionService} from "."
import {PlanningSessionModel} from "../models"

export default class WhitelistSessionService {

    public async all(): Promise<PlanningSessionModel[]> {
        return await planningSessionService.findSessions(SessionType.Whitelist)
    }
}