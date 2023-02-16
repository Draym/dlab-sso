import {SessionType} from "../../../../../enums"

export default interface SessionDto {
    id: number
    start: Date
    end: Date
    serviceUuid: string
    type: SessionType
    createdAt: Date
    updatedAt: Date
}