import {Endpoint} from "../enums"
import {Router} from "express"
import AuthController from "../controllers/auth/default/auth.controller"
import {validateQueryRequest, validateRequest} from "../middleware/validate-request.middleware"
import {LoginRequest, RegisterRequest} from "../dtos/reponse/default"
import {EmailSendCodeRequest, EmailVerifyCodeRequest} from "../dtos/email"
import authMiddleware from "../middleware/auth.middleware"

const router = Router()
const controller = new AuthController()



router.post(Endpoint.LOGIN, validateRequest(LoginRequest), controller.login)

router.post(Endpoint.LOGOUT, authMiddleware(), controller.logout)

router.post(Endpoint.REGISTER, validateRequest(RegisterRequest), controller.register)

router.post(Endpoint.REGISTER_EMAIL_RequestCode, validateRequest(EmailSendCodeRequest), controller.sendCodeForRegister)

router.get(Endpoint.REGISTER_EMAIL_VerifyCode, validateQueryRequest(EmailVerifyCodeRequest), controller.verifyCodeForRegister)

export default router
