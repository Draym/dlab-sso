import {
    MeEmailUpdateRequest,
    MePasswordUpdateRequest
} from "./dtos/user"
import {EmailSendCodeRequest, EmailVerifyCodeRequest, EmailVerifyCodeResponse} from "./dtos/email"
import {AuthBodyRequest, BodyRequest, QueryRequest} from "@d-lab/api-kit"

export default interface UserMeApi {
     updatePassword(req: AuthBodyRequest<MePasswordUpdateRequest>): Promise<void>
     updateEmail(req: AuthBodyRequest<MeEmailUpdateRequest>): Promise<void>
     sendCodeForEmail(req: BodyRequest<EmailSendCodeRequest>): Promise<void>
     verifyCodeForEmail(req: QueryRequest<EmailVerifyCodeRequest>): Promise<EmailVerifyCodeResponse>
     sendCodeForPassword(req: BodyRequest<EmailSendCodeRequest>): Promise<void>
     verifyCodeForPassword(req: QueryRequest<EmailVerifyCodeRequest>): Promise<EmailVerifyCodeResponse>
}