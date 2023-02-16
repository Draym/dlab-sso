import SessionDto from "./session/session.dto"

export default interface SessionOptionalResponse {
    session: SessionDto | null
}