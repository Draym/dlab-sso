import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import {ApplicationScope} from "../interfaces"
import {ApiModule} from "../enums"

export type ApplicationScopeCreationAttributes = Optional<ApplicationScope, "id" | "createdAt" | "updatedAt">

export default class ApplicationScopeModel extends Model<ApplicationScope, ApplicationScopeCreationAttributes> implements ApplicationScope {
    public id!: number
    public applicationId!: number
    public module!: ApiModule
    public createdAt!: Date
    public updatedAt!: Date
}

export const init = (sequelize: Sequelize): typeof ApplicationScopeModel => {
    // Init all models
    ApplicationScopeModel.init(
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            applicationId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                unique: true
            },
            module: {
                allowNull: false,
                type: DataTypes.STRING,
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
            modelName: "application_scopes",
            sequelize,
            timestamps: true
        },
    )
    return ApplicationScopeModel
}
