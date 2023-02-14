import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import {DiscordAccount} from "../interfaces"

export type DiscordAccountCreationAttributes = Optional<DiscordAccount, "id" | "createdAt" | "updatedAt">

export default class DiscordAccountModel extends Model<DiscordAccount, DiscordAccountCreationAttributes> implements DiscordAccount {
    public id!: number
    public discordId!: string
    public discordToken!: string
    public discordEmail!: string
    public userUuid!: string
    public scopes!: string
    public createdAt!: Date
    public updatedAt!: Date
}

export const init = (sequelize: Sequelize): typeof DiscordAccountModel => {
    // Init all models
    DiscordAccountModel.init(
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            discordId: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true
            },
            discordToken: {
                allowNull: false,
                type: DataTypes.STRING
            },
            discordEmail: {
                allowNull: false,
                type: DataTypes.STRING
            },
            userUuid: {
                allowNull: false,
                type: DataTypes.UUID,
                unique: true
            },
            scopes: {
                allowNull: false,
                type: DataTypes.STRING
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
            modelName: "discord_accounts",
            sequelize,
            timestamps: true
        },
    )
    return DiscordAccountModel
}
