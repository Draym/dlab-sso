import {SessionType} from "../../../../../enums"

export default interface SessionDto {
    id: number
    start: Date
    end: Date
    serviceId: number
    type: SessionType
    createdAt: Date
    updatedAt: Date
}