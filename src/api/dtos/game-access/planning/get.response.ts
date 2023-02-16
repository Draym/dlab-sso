import SessionDto from "./session/session.dto"

export default interface PlanningGetResponse {
    sessions: SessionDto[]
}