import {ApiAccessRequire, ApiAccessType, ApiModule, ErrorCode, SessionType, VerificationCodeTarget} from "../../enums"
import {HttpException} from "@d-lab/api-kit"

const Errors = {
    SERVICE_Closed: (reason: string) => new HttpException(ErrorCode.SERVICE_Closed, `${reason}`),
    SERVICE_PROVIDER_ApiError: (reason: string) => new HttpException(ErrorCode.SERVICE_PROVIDER_ApiError, `User not found for ${reason}`),
    NOT_FOUND_User: (reason: string) => new HttpException(ErrorCode.NOT_FOUND_User, `${reason}`),
    NOT_FOUND_UserCredentials: (reason: string) => new HttpException(ErrorCode.NOT_FOUND_UserCredentials, `${reason}`),
    NOT_FOUND_Role: (userId: number, role: string) => new HttpException(ErrorCode.NOT_FOUND_Role, `User of id[${userId}] doesn't have the role[${role}].`),
    NOT_FOUND_VerificationCode: () => new HttpException(ErrorCode.NOT_FOUND_VerificationCode, `Verification code not found. Please request a new code and try again.`),
    NOT_FOUND_RefreshToken: () => new HttpException(ErrorCode.NOT_FOUND_RefreshToken, `RefreshToken not found.`),
    NOT_FOUND_PlanningSession: (reason: string) => new HttpException(ErrorCode.NOT_FOUND_PlanningSession, `Planning Session not found for ${reason}.`),
    NOT_FOUND_Log: (reason: string) => new HttpException(ErrorCode.NOT_FOUND_Log, `${reason}`),
    NOT_FOUND_WalletValidator: (address: string) => new HttpException(ErrorCode.NOT_FOUND_WalletValidator, `No validator found for wallet address[${address}]`),
    NOT_FOUND_Wallet: (reason: string) => new HttpException(ErrorCode.NOT_FOUND_Wallet, `${reason}`),
    NOT_FOUND_WalletAddress: (address: string) => new HttpException(ErrorCode.NOT_FOUND_WalletAddress, `Wallet not found for address[${address}].`),
    NOT_FOUND_NewsletterSubscription: (reason: string) => new HttpException(ErrorCode.NOT_FOUND_NewsletterSubscription, `Newsletter subscription not found for ${reason}.`),
    NOT_FOUND_DiscordValidator: (reason: string) => new HttpException(ErrorCode.NOT_FOUND_DiscordValidator, `DiscordValidator not found for ${reason}.`),
    NOT_FOUND_DiscordAccount: (reason: string) => new HttpException(ErrorCode.NOT_FOUND_DiscordAccount, `DiscordAccount not found for ${reason}.`),
    NOT_FOUND_Application: (id: string) => new HttpException(ErrorCode.NOT_FOUND_Application, `Application not found for ${id}.`),
    NOT_FOUND_ApplicationScope: (applicationId: number, module: ApiModule) => new HttpException(ErrorCode.NOT_FOUND_ApplicationScope, `Application Scope not found for applicationId[${applicationId}] and module[${module}].`),
    NOT_FOUND_ApplicationUser: (reason: string) => new HttpException(ErrorCode.NOT_FOUND_ApplicationUser, `Application User not found for ${reason}.`),
    CONFLICT_Email: (email: string) => new HttpException(ErrorCode.CONFLICT_Email, `The email[${email}] is not available.`),
    CONFLICT_SameEmail: (email: string) => new HttpException(ErrorCode.CONFLICT_SameEmail, `The email[${email}] is already your account email.`),
    CONFLICT_PlanningSession: (type: SessionType) => new HttpException(ErrorCode.CONFLICT_PlanningSession, `Planning Session already exist for type[${type}] at given dates.`),
    CONFLICT_WalletAddress: (address: string) => new HttpException(ErrorCode.CONFLICT_WalletAddress, `A wallet with the same address[${address}] is already bound to an account.`),
    CONFLICT_WalletBind: (reason : string) => new HttpException(ErrorCode.CONFLICT_WalletBind, `A wallet is already bound to the account ${reason}.`),
    REJECTED_Password: () => new HttpException(ErrorCode.REJECTED_Password, `Incorrect Password.`),
    REJECTED_VerificationCode: (email: string, target: VerificationCodeTarget) => new HttpException(ErrorCode.REJECTED_VerificationCode, `Verification code used for another purpose. Please use the code sent to ${email} for ${target}.`),
    REQUIRE_Token: () => new HttpException(ErrorCode.REQUIRE_Token, `Authentication token missing.`),
    REQUIRE_Role: (role: string) => new HttpException(ErrorCode.REQUIRE_Role, `User has not the required[${role}] role.`),
    REQUIRE_Whitelist: () => new HttpException(ErrorCode.REQUIRE_Whitelist, `User is not whitelisted.`),
    REQUIRE_Access: () => new HttpException(ErrorCode.REQUIRE_Access, `User has been suspended.`),
    REQUIRE_DiscordEmail: () => new HttpException(ErrorCode.REQUIRE_DiscordEmail, `Discord email scope authentication is require to create a new account.`),
    REQUIRE_Ownership: (reason: string) => new HttpException(ErrorCode.REQUIRE_Ownership, reason),
    REQUIRE_ApiKey: () => new HttpException(ErrorCode.REQUIRE_ApiKey, `Authentication ApiKey is missing.`),
    REQUIRE_APP_Scope: (module: string) => new HttpException(ErrorCode.REQUIRE_APP_Scope, `Application doesn't have access to ${module} apis.`),
    REQUIRE_APP_TypeAccess: (type: ApiAccessType, required: ApiAccessType) => new HttpException(ErrorCode.REQUIRE_APP_TypeAccess, `Application of ${type} type doesn't have access to ${required} apis.`),
    REQUIRE_APP_AccessRequire: (require: ApiAccessRequire) => new HttpException(ErrorCode.REQUIRE_APP_AccessRequire, `Application require the ${require} access to call this api.`),
    INVALID_VerificationCode: (email: string) => new HttpException(ErrorCode.INVALID_VerificationCode, `Invalid verification code. Please use the code sent to ${email}.`),
    INVALID_Token: (error: string) => new HttpException(ErrorCode.INVALID_Token, `JWT validation error: ${error}`),
    INVALID_Parameter: (reason: string) => new HttpException(ErrorCode.INVALID_Parameter, `${reason}`),
    INVALID_ApiKey: () => new HttpException(ErrorCode.INVALID_ApiKey, `Authentication ApiKey is invalid.`),
    EXPIRED_VerificationCode: () => new HttpException(ErrorCode.EXPIRED_VerificationCode, `Your verification code has expired. Please request a new code and try again.`),
    EXPIRED_Token: () => new HttpException(ErrorCode.EXPIRED_Token, `Your token has expired. Please re-login or refresh your token.`),
    MISSING_Parameter: () => new HttpException(ErrorCode.MISSING_Parameter, `Request parameter not specified.`),
    MISSING_Filter: () => new HttpException(ErrorCode.MISSING_Filter, `Request filter not specified.`),
    RESTRICTED_VerificationCode: (amount: number, type: string) => new HttpException(ErrorCode.RESTRICTED_VerificationCode, `Sending verification code by email has been restricted for ${amount}${type}.`),
    RESTRICTED_Login: (email, amount: number, type: string) => new HttpException(ErrorCode.RESTRICTED_Login, `Login attempt has been restricted for email[${email}] for  ${amount}${type}.`),
    REJECTED_Signature: () => new HttpException(ErrorCode.REJECTED_Signature, `Incorrect Wallet Signature.`),
    REJECTED_WalletUnbind: (userId: number, address: string) => new HttpException(ErrorCode.REJECTED_WalletUnbind, `Wallet of address[${address}] is not bound to owner id[${userId}] account.`),
    CONFLICT_DiscordNotAvailable: (discordId: string) => new HttpException(ErrorCode.CONFLICT_DiscordNotAvailable, `This Discord account[${discordId}] is already bound to another account.`),
    CONFLICT_DiscordBind: (ownerId: number) => new HttpException(ErrorCode.CONFLICT_DiscordBind, `A Discord account is already bound to the account id[${ownerId}].`),
}

export default Errors