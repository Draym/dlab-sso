import {TokenRefreshRequest, TokenResponse} from "./dtos/auth"
import {BodyRequest} from "@d-lab/api-kit"
import {Response} from "express"

export default interface AuthTokenApi {
     refreshToken(req: BodyRequest<TokenRefreshRequest>, res: Response): Promise<TokenResponse>
}