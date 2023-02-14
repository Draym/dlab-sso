import {NewsletterSubscriptionModel} from "../models"
import db from "../db/database"
import Errors from "../utils/errors/Errors"
import {isNull, throwIfNull} from "../utils/validators/checks"

export default class NewsletterSubscriptionService {
    public newsletterSubscription = db.NewsletterSubscriptions


    public async getAll(): Promise<NewsletterSubscriptionModel[]> {
        return await this.newsletterSubscription.findAll()
    }

    public async findSubscription(userIdentifier: string): Promise<NewsletterSubscriptionModel | null> {
        return await this.newsletterSubscription.findOne({
            where: {
                userUuid: userIdentifier
            }
        })
    }

    public async subscribe(userIdentifier: string): Promise<NewsletterSubscriptionModel> {
        const subscription = await this.findSubscription(userIdentifier)
        if (isNull(subscription)) {
            return await this.newsletterSubscription.create({
                userUuid: userIdentifier
            })
        }
        return subscription!
    }

    public async unsubscribe(userIdentifier: string): Promise<NewsletterSubscriptionModel> {
        const subscription = await this.findSubscription(userIdentifier)
        throwIfNull(subscription, Errors.NOT_FOUND_NewsletterSubscription(userIdentifier))
        await subscription!.destroy()
        return subscription!
    }
}