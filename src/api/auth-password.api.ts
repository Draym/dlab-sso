import {EmailSendCodeRequest, EmailVerifyCodeRequest, EmailVerifyCodeResponse} from "./dtos/email"
import {BodyRequest, QueryRequest} from "@d-lab/api-kit"
import {PasswordResetRequest} from "./dtos/auth/default"

export default interface AuthPasswordApi {
     resetPassword(req: BodyRequest<PasswordResetRequest>): Promise<void>
     sendCode(req: BodyRequest<EmailSendCodeRequest>): Promise<void>
     verifyCode(req: QueryRequest<EmailVerifyCodeRequest>): Promise<EmailVerifyCodeResponse>
}