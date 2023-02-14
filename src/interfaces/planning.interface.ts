import {SessionType} from "../enums"

export default interface PlanningSession {
    id: number
    start: Date
    end: Date
    type: SessionType
    createdAt: Date
    updatedAt: Date
}