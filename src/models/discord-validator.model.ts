import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import {DiscordValidator} from "../interfaces"

export type DiscordValidatorCreationAttributes = Optional<DiscordValidator, "id" | "createdAt" | "updatedAt">

export default class DiscordValidatorModel extends Model<DiscordValidator, DiscordValidatorCreationAttributes> implements DiscordValidator {
    public id!: number
    public discordId!: string
    public discordToken!: string
    public discordScope!: string
    public requestNonce!: string
    public authKey!: string
    public createdAt!: Date
    public updatedAt!: Date
}

export const init = (sequelize: Sequelize): typeof DiscordValidatorModel => {
    // Init all models
    DiscordValidatorModel.init(
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
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
            discordScope: {
                allowNull: false,
                type: DataTypes.STRING
            },
            requestNonce: {
                allowNull: false,
                type: DataTypes.STRING
            },
            authKey: {
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
            modelName: "discord_validators",
            sequelize,
            timestamps: true
        },
    )
    return DiscordValidatorModel
}
