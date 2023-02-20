import {GetSubscribersResponse, SubscriberResponse} from "../../api/dtos/newsletter"
import {sequelize} from "../../db/database"
import {newsletterSubscriptionService} from "../../services"
import {AuthRequest, isNotNull} from "@d-lab/api-kit"

export default class NewsletterController {
    async getSubscribers(req: AuthRequest): Promise<GetSubscribersResponse> {
        const [results, _] = await sequelize.query(
            "SELECT user.email FROM newsletter_subscription sub INNER JOIN users user ON sub.user_id = user.id"
        )
        return {
            subscribers: results.filter(isNotNull) as SubscriberResponse[]
        }
    }

    async subscribe(req: AuthRequest): Promise<void> {
        const caller = req.caller
        await newsletterSubscriptionService.subscribe(caller.id)
    }

    async unsubscribe(req: AuthRequest): Promise<void> {
        const caller = req.caller
        await newsletterSubscriptionService.unsubscribe(caller.id)
    }
}