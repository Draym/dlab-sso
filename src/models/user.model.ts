import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import {User} from "../interfaces"

export type UserCreationAttributes = Optional<User, "id" | "uuid" | "email" | "suspended" | "createdAt" | "updatedAt">

export default class UserModel extends Model<User, UserCreationAttributes> implements User {
    public id: number
    public uuid: string
    public email: string | null
    public suspended: boolean
    public createdAt: Date
    public updatedAt: Date
}

export const init = (sequelize: Sequelize): typeof UserModel => {
    // Init all models
    UserModel.init(
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            uuid: {
                allowNull: false,
                type: DataTypes.UUID,
                unique: "uuid",
                defaultValue: DataTypes.UUIDV4
            },
            email: {
                allowNull: true,
                type: DataTypes.STRING,
                unique: "email",
            },
            suspended: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
                defaultValue: false
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
            modelName: "users",
            sequelize,
            timestamps: true
        },
    )
    return UserModel
}
