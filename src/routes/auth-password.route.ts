import {Router} from "express"
import {validateRequest, validateQueryRequest} from "../middleware/validate-request.middleware"
import {Endpoint} from "../enums"
import {EmailSendCodeRequest, EmailVerifyCodeRequest} from "../api/dtos/email"
import AuthPasswordController from "../controllers/auth/default/password.controller"
import {handle} from "@d-lab/api-kit"
import {PasswordResetRequest} from "../api/dtos/auth/default"

const router = Router()
const ctrl = new AuthPasswordController()

router.post(Endpoint.PASSWORD_RESET, validateRequest(PasswordResetRequest), handle.bind(ctrl.resetPassword))
router.post(Endpoint.PASSWORD_RESET_RequestCode, validateRequest(EmailSendCodeRequest), handle.bind(ctrl.sendCode))
router.get(Endpoint.PASSWORD_RESET_VerifyCode, validateQueryRequest(EmailVerifyCodeRequest), handle.bind(ctrl.verifyCode))

export default router