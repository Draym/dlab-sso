import {ErrorCode} from "../../enums"
import {HttpException} from "@d-lab/api-kit"

const Errors = {
    SERVICE_Closed: (reason: string) => new HttpException(ErrorCode.SERVICE_Closed, `${reason}`),
    SERVICE_PROVIDER_ApiError: (reason: string) => new HttpException(ErrorCode.SERVICE_PROVIDER_ApiError, `User not found for ${reason}`),
    REJECTED_Password: () => new HttpException(ErrorCode.REJECTED_Password, `Incorrect Password.`),
    REQUIRE_Token: () => new HttpException(ErrorCode.REQUIRE_Token, `Authentication token missing.`),
    REQUIRE_Role: (role: string) => new HttpException(ErrorCode.REQUIRE_Role, `User has not the required[${role}] role.`),
    REQUIRE_Access: () => new HttpException(ErrorCode.REQUIRE_Access, `User has been suspended.`),
    REQUIRE_Ownership: (reason: string) => new HttpException(ErrorCode.REQUIRE_Ownership, reason),
    REQUIRE_ApiKey: () => new HttpException(ErrorCode.REQUIRE_ApiKey, `Authentication ApiKey is missing.`),
    INVALID_Token: (error: string) => new HttpException(ErrorCode.INVALID_Token, `JWT validation error: ${error}`),
    INVALID_Parameter: (reason: string) => new HttpException(ErrorCode.INVALID_Parameter, `${reason}`),
    INVALID_ApiKey: () => new HttpException(ErrorCode.INVALID_ApiKey, `Authentication ApiKey is invalid.`),
    EXPIRED_Token: () => new HttpException(ErrorCode.EXPIRED_Token, `Your token has expired. Please re-login or refresh your token.`),
    RESTRICTED_Login: (email, amount: number, type: string) => new HttpException(ErrorCode.RESTRICTED_Login, `Login attempt has been restricted for email[${email}] for  ${amount}${type}.`),
}

export default Errors