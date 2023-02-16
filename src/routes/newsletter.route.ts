import {Router} from "express"
import {ApiAccessType, ApiModule, Endpoint} from "../enums"
import authMiddleware from "../middleware/auth.middleware"
import hasRole from "../middleware/has-role.middleware"
import NewsletterController from "../controllers/newsletter/newsletter.controller"
import Role from "../enums/role.enum"
import {ApiScopeImpl, handle} from "@d-lab/api-kit"

const router = Router()
const ctrl = new NewsletterController()

const scope = ApiScopeImpl.default(ApiModule.Newsletter, ApiAccessType.Management)

router.get(Endpoint.NEWSLETTER_GetSubscribers, authMiddleware(scope), hasRole(Role.Operator), handle.bind(ctrl.getSubscribers))
router.post(Endpoint.NEWSLETTER_Subscribe, authMiddleware(scope.personal().write()), handle.bind(ctrl.subscribe))
router.delete(Endpoint.NEWSLETTER_Unsubscribe, authMiddleware(scope.personal().write()), handle.bind(ctrl.unsubscribe))

export default router