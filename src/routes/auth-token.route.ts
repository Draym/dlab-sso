import {validateRequest} from "../middleware/validate-request.middleware"
import {Router} from "express"
import AuthTokenController from "../controllers/auth/auth-token.controller"
import {Endpoint} from "../enums"
import {TokenRefreshRequest} from "../api/dtos/auth"
import {handle} from "@d-lab/api-kit"

const router = Router()
const ctrl = new AuthTokenController()

router.post(Endpoint.TOKEN_REFRESH, validateRequest(TokenRefreshRequest), handle.bind(ctrl.refreshToken))

export default router