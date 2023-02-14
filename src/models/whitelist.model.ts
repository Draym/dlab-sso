import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import {Whitelist} from "../interfaces"

export type WhitelistCreationAttributes = Optional<Whitelist, "id">

export default class WhitelistModel
    extends Model<Whitelist, WhitelistCreationAttributes>
    implements Whitelist {
    public id!: number
    public email!: string
}

export const init = (sequelize: Sequelize): typeof WhitelistModel => {
    WhitelistModel.init(
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: "email"
            }
        },
        {
            underscored: true,
            modelName: "whitelist",
            sequelize,
            timestamps: false,
        },
    )

    return WhitelistModel
}
