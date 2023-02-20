
import {EmailSendCodeRequest, EmailVerifyCodeRequest, EmailVerifyCodeResponse} from "./dtos/email"
import {AuthRequest, BodyRequest, QueryRequest} from "@d-lab/api-kit"
import {Response} from "express"
import {LoginRequest, RegisterRequest} from "./dtos/auth/default"
import {TokenResponse} from "./dtos/auth"

export default interface AuthApi {
     sendCodeForRegister(req: BodyRequest<EmailSendCodeRequest>): Promise<void>
     verifyCodeForRegister(req: QueryRequest<EmailVerifyCodeRequest>): Promise<EmailVerifyCodeResponse>
     register(req: BodyRequest<RegisterRequest>, res: Response): Promise<TokenResponse>
     logout(req: AuthRequest, res: Response): Promise<void>
     login(req: BodyRequest<LoginRequest>, res: Response): Promise<TokenResponse>
}