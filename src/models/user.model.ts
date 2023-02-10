import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import {User} from "../interfaces"

export type UserCreationAttributes = Optional<User, "id" | "identifier" | "suspended" | "createdAt" | "updatedAt">

export default class UserModel extends Model<User, UserCreationAttributes> implements User {
    public id: number
    public identifier: string
    public name: string
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
            identifier: {
                allowNull: false,
                type: DataTypes.UUID,
                unique: "identifier",
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
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
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
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
