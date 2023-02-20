import {AuthMeResponse} from "./dtos/auth"
import {AuthRequest} from "@d-lab/api-kit"

export default interface AuthMeApi {
     getMe(req: AuthRequest): Promise<AuthMeResponse>
}