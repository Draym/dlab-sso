import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import * as bcrypt from "bcryptjs"
import {Application} from "../interfaces"
import {ApiAccessRequire, ApiAccessType} from "@d-lab/api-kit"

export type ApplicationCreationAttributes = Optional<Application, "id" | "createdAt" | "updatedAt">

export default class ApplicationModel extends Model<Application, ApplicationCreationAttributes> implements Application {
    public id!: number
    public ownerId!: number
    public name!: string
    public description!: string
    public apiKey!: string
    public type!: ApiAccessType
    public accessType!: ApiAccessRequire
    public createdAt!: Date
    public updatedAt!: Date
    public isValidApiKey: (apiKey: string) => boolean
}

export const init = (sequelize: Sequelize): typeof ApplicationModel => {
    // Init all models
    ApplicationModel.init(
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            ownerId: {
                allowNull: false,
                type: DataTypes.STRING
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING
            },
            description: {
                allowNull: false,
                type: DataTypes.STRING
            },
            apiKey: {
                allowNull: false,
                type: DataTypes.STRING
            },
            type: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            accessType: {
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
            modelName: "applications",
            sequelize,
            timestamps: true
        },
    )

    /**
     * Compare application provided password with DB password hash
     */
    ApplicationModel.prototype.isValidApiKey = function (apiKey: string) {
        return bcrypt.compareSync(apiKey, this.apiKey)
    }

    /**
     * Deletes password from returned values
     */
    ApplicationModel.prototype.toJSON = function (): object {
        const values = Object.assign({}, this.get())
        delete values.apiKey
        return values
    }

    return ApplicationModel
}
