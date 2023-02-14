import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import * as bcrypt from "bcryptjs"
import {ApplicationUser} from "../interfaces"
import {ApiAccessRequire, ApiAccessType, ApiModule, Role} from "../enums"

export type ApplicationUserCreationAttributes = Optional<ApplicationUser, "id" | "createdAt" | "updatedAt">

export default class ApplicationUserModel extends Model<ApplicationUser, ApplicationUserCreationAttributes> implements ApplicationUser {
    public id!: number
    public applicationId!: number
    public userId!: number
    public role!: Role
    public createdAt!: Date
    public updatedAt!: Date
}

export const init = (sequelize: Sequelize): typeof ApplicationUserModel => {
    // Init all models
    ApplicationUserModel.init(
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            applicationId: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            userId: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            role: {
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
            modelName: "application_users",
            sequelize,
            timestamps: true
        },
    )
    return ApplicationUserModel
}
