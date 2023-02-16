import {SessionType} from "../enums"
import {DayPickerRequest, TimeRequest} from "../api/dtos/game-access/planning/assistant"
import Errors from "../utils/errors/Errors"
import {SessionData} from "./planning-assistant.service"
import {numberOdfDays, throwIf, UTCDate} from "@d-lab/api-kit"

export default class PlanningAssistantLogic {
    public static generateSessions(type: SessionType, from: Date, to: Date, startTime: TimeRequest, endTime: TimeRequest, dayPicker: DayPickerRequest): SessionData[] {
        throwIf(from > to, Errors.INVALID_Parameter("From date should be before To date."))

        const allowedDays = [dayPicker.sunday, dayPicker.monday, dayPicker.tuesday, dayPicker.wednesday, dayPicker.thursday, dayPicker.friday, dayPicker.saturday]

        const sessions: SessionData[] = []
        const days = numberOdfDays(from, to)
        for (let i = 0; i < days; ++i) {
            const sessionStart = UTCDate(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate() + i, startTime.hour, startTime.minute, startTime.second)
            const sessionEnd = UTCDate(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate() + i, endTime.hour, endTime.minute, endTime.second)
            const currentDay = sessionStart.getUTCDay()

            let nextDay = 0
            if (startTime.hour > endTime.hour) {
                nextDay = 1
            }
            sessionEnd.setUTCDate(sessionEnd.getUTCDate() + nextDay)

            if (sessionStart < from) {
                // do nothing for this session
            } else if (sessionStart > to || sessionEnd > to) {
                break
            } else if (allowedDays[currentDay]) {
                sessions.push({type, start: new Date(sessionStart), end: new Date(sessionEnd)})
            }
        }
        return sessions
    }
}