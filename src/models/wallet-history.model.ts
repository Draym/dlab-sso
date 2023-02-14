import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import {WalletHistory} from "../interfaces"
import {WalletType} from "../enums"

export type WalletHistoryCreationAttributes = Optional<WalletHistory, "id" | "unbindAt">

export default class WalletHistoryModel
    extends Model<WalletHistory, WalletHistoryCreationAttributes>
    implements WalletHistory {
    public id!: number
    public address!: string
    public type!: WalletType
    public userUuid!: string
    public bindAt!: Date
    public unbindAt: Date | null
}

export const init = (sequelize: Sequelize): typeof WalletHistoryModel => {
    WalletHistoryModel.init(
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
            userUuid: {
                allowNull: false,
                type: DataTypes.UUIDV4
            },
            bindAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            unbindAt: {
                allowNull: true,
                type: DataTypes.DATE
            }
        },
        {
            underscored: true,
            modelName: "wallet_history",
            sequelize,
            timestamps: false,
        },
    )

    return WalletHistoryModel
}
