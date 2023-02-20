import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import {Wallet} from "../interfaces"
import {WalletType} from "../enums"

export type WalletCreationAttributes = Optional<Wallet, "id" | "createdAt" | "updatedAt">

export default class WalletModel
    extends Model<Wallet, WalletCreationAttributes>
    implements Wallet {
    public id!: number
    public address!: string
    public type!: WalletType
    public userId!: number
    public createdAt!: Date
    public updatedAt!: Date
}

export const init = (sequelize: Sequelize): typeof WalletModel => {
    WalletModel.init(
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            address: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true
            },
            type: {
                allowNull: false,
                type: DataTypes.STRING
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
            modelName: "wallets",
            sequelize,
            timestamps: true,
        },
    )

    return WalletModel
}
