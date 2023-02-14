import {Router} from "express"
import {ApiAccessType, ApiModule, Endpoint} from "../enums"
import authMiddleware from "../middleware/auth.middleware"
import hasRole from "../middleware/has-role.middleware"
import NewsletterController from "../controllers/newsletter/newsletter.controller"
import {ApiScopeImpl} from "./api.scope"
import Role from "../enums/role.enum"

const router = Router()
const newsletterController = new NewsletterController()

const scope = ApiScopeImpl.default(ApiModule.Newsletter, ApiAccessType.Management)



router.get(Endpoint.NEWSLETTER_GetSubscribers, authMiddleware(scope), hasRole(Role.Operator), newsletterController.getSubscribers)

router.post(Endpoint.NEWSLETTER_Subscribe, authMiddleware(scope.personal().write()), newsletterController.subscribe)

router.post(Endpoint.NEWSLETTER_Unsubscribe, authMiddleware(scope.personal().write()), newsletterController.unsubscribe)


export default router