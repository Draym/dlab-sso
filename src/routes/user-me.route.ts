import authMiddleware from "../middleware/auth.middleware"
import {Router} from "express"
import UserMeController from "../controllers/user/user-me.controller"
import {validateRequest, validateQueryRequest} from "../middleware/validate-request.middleware"
import {
    MePasswordUpdateRequest,
    MeEmailUpdateRequest,
    MePasswordUpdateByEmailRequest,
    MeEmailUpdateByEmailRequest
} from "../api/dtos/user"
import {ApiAccessType, ApiModule, Endpoint} from "../enums"
import {EmailVerifyCodeRequest, EmailSendCodeRequest} from "../api/dtos/email"
import {ApiScopeImpl, handle} from "@d-lab/api-kit"

const router = Router()
const ctrl = new UserMeController()

const scope = ApiScopeImpl.default(ApiModule.User, ApiAccessType.Personal)

router.put(Endpoint.ME_EMAIL_Update, validateRequest(MeEmailUpdateRequest), authMiddleware(scope.write()), handle.bind(ctrl.updateEmail))
router.put(Endpoint.ME_EMAIL_UpdateByEmail, validateRequest(MeEmailUpdateByEmailRequest), authMiddleware(scope.write()), handle.bind(ctrl.updateEmailByEmail))
router.post(Endpoint.ME_EMAIL_RequestCode, validateRequest(EmailSendCodeRequest), handle.bind(ctrl.sendCodeForEmail))
router.get(Endpoint.ME_EMAIL_VerifyCode, validateQueryRequest(EmailVerifyCodeRequest), handle.bind(ctrl.verifyCodeForEmail))
router.put(Endpoint.ME_PASSWORD_Update, validateRequest(MePasswordUpdateRequest), authMiddleware(scope.write()), handle.bind(ctrl.updatePassword))
router.put(Endpoint.ME_PASSWORD_UpdateByEmail, validateRequest(MePasswordUpdateByEmailRequest), authMiddleware(scope.write()), handle.bind(ctrl.updatePasswordByEmail))
router.post(Endpoint.ME_PASSWORD_RequestCode, validateRequest(EmailSendCodeRequest), handle.bind(ctrl.sendCodeForPassword))
router.get(Endpoint.ME_PASSWORD_VerifyCode, validateQueryRequest(EmailVerifyCodeRequest), handle.bind(ctrl.verifyCodeForPassword))

export default router
