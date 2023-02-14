import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import {WalletValidator} from "../interfaces"
import {nanoid} from "nanoid"

export type WalletValidatorCreationAttributes = Optional<WalletValidator, "id" | "nonce" | "createdAt" | "updatedAt">

export default class WalletValidatorModel
    extends Model<WalletValidator, WalletValidatorCreationAttributes>
    implements WalletValidator {
    public id: number
    public address: string
    public nonce: string
    public createdAt: Date
    public updatedAt: Date
}

export const init = (sequelize: Sequelize): typeof WalletValidatorModel => {
    WalletValidatorModel.init(
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            address: {
                allowNull: false,
                type: DataTypes.STRING
            },
            nonce: {
                allowNull: false,
                type: DataTypes.STRING(75),
                defaultValue: nanoid,
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
            modelName: "wallet_validators",
            sequelize,
            timestamps: true,
        },
    )

    return WalletValidatorModel
}
