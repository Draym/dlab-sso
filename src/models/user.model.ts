import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import {User} from "../interfaces"

export type UserCreationAttributes = Optional<User, "id" | "identifier" | "createdAt">

export default class UserModel extends Model<User, UserCreationAttributes> implements User {
    public id: number
    public identifier: string
    public name: string
    public email: string
    public createdAt: Date
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
                allowNull: false,
                type: DataTypes.STRING,
                unique: "email",
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                field: "created_at"
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
