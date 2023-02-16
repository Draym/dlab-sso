import {NewsletterSubscriptionModel} from "../models"
import db from "../db/database"
import Errors from "../utils/errors/Errors"
import {eq, Filter, isNull, throwIfNull} from "@d-lab/api-kit"

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

    public async subscribe(userUuid: string): Promise<NewsletterSubscriptionModel> {
        const subscription = await this.findBy(eq({userUuid}))
        if (isNull(subscription)) {
            return await db.NewsletterSubscriptions.create({
                userUuid: userUuid
            })
        }
        return subscription!
    }

    public async unsubscribe(userUuid: string): Promise<NewsletterSubscriptionModel> {
        const subscription = await this.getBy(eq({userUuid}))
        await subscription.destroy()
        return subscription!
    }
}