import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import {UserRole} from "../interfaces"
import {Role} from "../enums"

export type UserRolesCreationAttributes = Optional<UserRole, "id">

export default class UserRoleModel
    extends Model<UserRole, UserRolesCreationAttributes>
    implements UserRole {
    public id!: number
    public userId!: number
    public role!: Role
}

export const init = (sequelize: Sequelize): typeof UserRoleModel => {
    UserRoleModel.init(
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            userId: {
                allowNull: false,
                type: DataTypes.NUMBER,
                unique: true
            },
            role: {
                allowNull: false,
                type: DataTypes.STRING
            }
        },
        {
            underscored: true,
            modelName: "user_roles",
            sequelize,
            timestamps: false,
        },
    )

    return UserRoleModel
}
