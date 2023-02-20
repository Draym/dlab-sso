import {SessionType} from "../enums"

export default interface PlanningSession {
    id: number
    start: Date
    end: Date
    type: SessionType
    serviceId: number
    createdAt: Date
    updatedAt: Date
}