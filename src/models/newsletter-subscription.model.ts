import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import {NewsletterSubscription} from "../interfaces"

export type NewsletterSubscriptionCreationAttributes = Optional<NewsletterSubscription, "id" | "createdAt" | "updatedAt">

export default class NewsletterSubscriptionModel
    extends Model<NewsletterSubscription, NewsletterSubscriptionCreationAttributes>
    implements NewsletterSubscription {
    public id!: number
    public userId!: number
    public createdAt!: Date
    public updatedAt!: Date
}

export const init = (sequelize: Sequelize): typeof NewsletterSubscriptionModel => {
    NewsletterSubscriptionModel.init(
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            userId: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: Sequelize.fn("NOW")
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: Sequelize.fn("NOW")
            }
        },
        {
            underscored: true,
            modelName: "newsletter_subscription",
            sequelize,
            timestamps: true,
        },
    )

    return NewsletterSubscriptionModel
}
