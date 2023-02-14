import { Router } from "express"
import authMiddleware from "../middleware/auth.middleware"
import AuthMeController from "../controllers/auth/auth-me.controller"
import {ApiAccessType, ApiModule, Endpoint} from "../enums"
import {ApiScopeImpl} from "./api.scope"

const router = Router()
const controller = new AuthMeController()

const scope = ApiScopeImpl.default(ApiModule.User, ApiAccessType.Personal)



router.get(Endpoint.ME, authMiddleware(scope), controller.getMe)

export default router
