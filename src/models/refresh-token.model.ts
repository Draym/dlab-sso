import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import {RefreshToken} from "../interfaces"

export type RefreshTokensCreationAttributes = Optional<RefreshToken, "id">

export default class RefreshTokenModel
    extends Model<RefreshToken, RefreshTokensCreationAttributes>
    implements RefreshToken {
    public id!: number
    public token!: string
    public userId!: number
    public validUntil!: Date
}

export const init = (sequelize: Sequelize): typeof RefreshTokenModel => {
    RefreshTokenModel.init(
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            userId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                unique: true
            },
            token: {
                allowNull: false,
                type: DataTypes.STRING(555)
            },
            validUntil: {
                allowNull: false,
                type: DataTypes.DATE
            }
        },
        {
            underscored: true,
            modelName: "refresh_tokens",
            sequelize,
            timestamps: false,
        },
    )

    return RefreshTokenModel
}
