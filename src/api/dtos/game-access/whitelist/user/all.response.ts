import {WhitelistStatus} from "../../../../enums"

export default interface WhitelistUserAllResponse {
    emails: string[]
    whitelistStatus: WhitelistStatus
}