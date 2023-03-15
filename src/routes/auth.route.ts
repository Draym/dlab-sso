import { Router } from "express"
import authMiddleware from "../middleware/auth.middleware"
import AuthMeController from "../controllers/auth/auth-me.controller"
import { ApiModule, Endpoint} from "../enums"
import {ApiAccessType, ApiScopeImpl, handle} from "@d-lab/api-kit"
const router = Router()
const ctrl = new AuthMeController()

const scope = ApiScopeImpl.default(ApiModule.User, ApiAccessType.Personal)

router.get(Endpoint.ME, authMiddleware(scope), handle.bind(ctrl.getMe))

export default router
