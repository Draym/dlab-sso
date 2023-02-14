import {SessionType} from "../../../enums"

export default interface SessionResponse {
    id: number,
    start: Date,
    end: Date,
    type: SessionType,
    createdAt: Date,
    updatedAt: Date
}