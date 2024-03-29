import authMiddleware from "../middleware/auth.middleware"
import {Router} from "express"
import UserMeController from "../controllers/user/user-me.controller"
import {validateRequest, validateQueryRequest} from "../middleware/validate-request.middleware"
import {
    MePasswordUpdateRequest,
    MeEmailUpdateRequest
} from "../api/dtos/user"
import {ApiModule, Endpoint} from "../enums"
import {EmailVerifyCodeRequest, EmailSendCodeRequest} from "../api/dtos/email"
import {ApiAccessType, ApiScopeImpl, handle} from "@d-lab/api-kit"

const router = Router()
const ctrl = new UserMeController()

const scope = ApiScopeImpl.default(ApiModule.User, ApiAccessType.Personal)

router.put(Endpoint.ME_EMAIL_Update, validateRequest(MeEmailUpdateRequest), authMiddleware(scope.write()), handle.bind(ctrl.updateEmail))
router.post(Endpoint.ME_EMAIL_RequestCode, validateRequest(EmailSendCodeRequest), handle.bind(ctrl.sendCodeForEmail))
router.get(Endpoint.ME_EMAIL_VerifyCode, validateQueryRequest(EmailVerifyCodeRequest), handle.bind(ctrl.verifyCodeForEmail))
router.put(Endpoint.ME_PASSWORD_Update, validateRequest(MePasswordUpdateRequest), authMiddleware(scope.write()), handle.bind(ctrl.updatePassword))
router.post(Endpoint.ME_PASSWORD_RequestCode, validateRequest(EmailSendCodeRequest), handle.bind(ctrl.sendCodeForPassword))
router.get(Endpoint.ME_PASSWORD_VerifyCode, validateQueryRequest(EmailVerifyCodeRequest), handle.bind(ctrl.verifyCodeForPassword))

export default router
