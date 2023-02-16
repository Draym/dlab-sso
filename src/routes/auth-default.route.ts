import {Endpoint} from "../enums"
import {Router} from "express"
import AuthController from "../controllers/auth/default/auth.controller"
import {validateQueryRequest, validateRequest} from "../middleware/validate-request.middleware"
import {EmailSendCodeRequest, EmailVerifyCodeRequest} from "../api/dtos/email"
import authMiddleware from "../middleware/auth.middleware"
import {LoginRequest, RegisterRequest} from "../api/dtos/auth/default"
import {handle} from "@d-lab/api-kit"

const router = Router()
const ctrl = new AuthController()

router.post(Endpoint.LOGIN, validateRequest(LoginRequest), handle.bind(ctrl.login))
router.post(Endpoint.LOGOUT, authMiddleware(), handle.bind(ctrl.logout))
router.post(Endpoint.REGISTER, validateRequest(RegisterRequest), handle.bind(ctrl.register))
router.post(Endpoint.REGISTER_EMAIL_RequestCode, validateRequest(EmailSendCodeRequest), handle.bind(ctrl.sendCodeForRegister))
router.get(Endpoint.REGISTER_EMAIL_VerifyCode, validateQueryRequest(EmailVerifyCodeRequest), handle.bind(ctrl.verifyCodeForRegister))

export default router
