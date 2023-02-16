import {SessionType} from "../enums"

export default interface PlanningSession {
    id: number
    start: Date
    end: Date
    type: SessionType
    serviceUuid: string
    createdAt: Date
    updatedAt: Date
}