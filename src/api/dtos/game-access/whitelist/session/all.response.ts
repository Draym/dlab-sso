import {WhitelistStatus} from "../../../../enums"

interface WhitelistSessionResponse {
    start: Date
    end: Date
}

/**
 * @deprecated use Planning APIs instead
 */
export default interface WhitelistSessionAllResponse {
    sessions: WhitelistSessionResponse[]
    whitelistStatus: WhitelistStatus
}