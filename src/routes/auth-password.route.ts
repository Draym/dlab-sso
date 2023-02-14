import {Router} from "express"
import {validateRequest, validateQueryRequest} from "../middleware/validate-request.middleware"
import {Endpoint} from "../enums"
import {PasswordResetRequest} from "../dtos/reponse/default"
import {EmailSendCodeRequest, EmailVerifyCodeRequest} from "../dtos/email"
import AuthPasswordController from "../controllers/auth/default/password.controller"

const router = Router()
const controller = new AuthPasswordController()


router.post(Endpoint.PASSWORD_RESET, validateRequest(PasswordResetRequest), controller.resetPassword)

router.post(Endpoint.PASSWORD_RESET_RequestCode, validateRequest(EmailSendCodeRequest), controller.sendCode)

router.get(Endpoint.PASSWORD_RESET_VerifyCode, validateQueryRequest(EmailVerifyCodeRequest), controller.verifyCode)

export default router