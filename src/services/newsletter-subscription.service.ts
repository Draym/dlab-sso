import {NewsletterSubscriptionModel} from "../models"
import db from "../db/database"
import Errors from "../utils/errors/Errors"
import {eq, Filter} from "@d-lab/api-kit"
import {isNull, throwIfNull} from "@d-lab/common-kit"

export default class NewsletterSubscriptionService {

    public async getAll(): Promise<NewsletterSubscriptionModel[]> {
        return await db.NewsletterSubscriptions.findAll()
    }

    public async findBy(filter: Filter): Promise<NewsletterSubscriptionModel | null> {
        return await db.NewsletterSubscriptions.findOne(filter.get())
    }

    public async getBy(filter: Filter): Promise<NewsletterSubscriptionModel> {
        const subscription = await this.findBy(filter)
        throwIfNull(subscription, Errors.NOT_FOUND_NewsletterSubscription(filter.stringify()))
        return subscription!
    }

    public async subscribe(userId: number): Promise<NewsletterSubscriptionModel> {
        const subscription = await this.findBy(eq({userId}))
        if (isNull(subscription)) {
            return await db.NewsletterSubscriptions.create({
                userId: userId
            })
        }
        return subscription!
    }

    public async unsubscribe(userId: number): Promise<NewsletterSubscriptionModel> {
        const subscription = await this.getBy(eq({userId}))
        await subscription.destroy()
        return subscription!
    }
}