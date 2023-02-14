import {ErrorCode, SessionType} from "../enums"
import {DayPickerRequest, TimeRequest} from "../dtos/game-access/planning/assistant"
import {planningSessionService} from "."
import PlanningSession from "../interfaces/planning.interface"
import PlanningAssistantLogic from "./planning-assistant.logic"

export interface SessionData {
    type: SessionType,
    start:Date,
    end: Date
}

export default class PlanningAssistantService {

    public async createBatch(type: SessionType, from: Date, to: Date, startTime: TimeRequest, endTime: TimeRequest, dayPicker: DayPickerRequest, ignoreConflicts: boolean): Promise<PlanningSession[]> {

        const sessions = PlanningAssistantLogic.generateSessions(type, from, to, startTime, endTime, dayPicker)

        const createdSessions: PlanningSession[] = []
        for (const session of sessions) {
            try {
                const result = await planningSessionService.create(session.type, session.start, session.end)
                createdSessions.push(result)
            } catch (e) {
                if (e.code === ErrorCode.CONFLICT_PlanningSession && !ignoreConflicts) {
                    throw e
                }
            }
        }
        return createdSessions
    }

    public async deleteBatch(type: SessionType, from: Date, to: Date): Promise<PlanningSession[]> {
        const sessions = await planningSessionService.findSessions(type, to, from)
        for (const session of sessions) {
            await planningSessionService.delete(session.id)
        }
        return sessions
    }
}