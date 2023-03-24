import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import * as bcrypt from "bcryptjs"
import {UserCredentials} from "../interfaces"
import {isEmpty, throwIf} from "@d-lab/common-kit"
import Errors from "../utils/errors/Errors"

export type UserCredentialsCreationAttributes = Optional<UserCredentials, "id" | "createdAt" | "updatedAt">

export default class UserCredentialsModel extends Model<UserCredentials, UserCredentialsCreationAttributes> implements UserCredentials {
    public id!: number
    public userId!: number
    public email!: string
    public password!: string
    public createdAt!: Date
    public updatedAt!: Date
    public isValidPassword: (password: string) => boolean
}

export const init = (sequelize: Sequelize): typeof UserCredentialsModel => {
    // Init all models
    UserCredentialsModel.init(
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            userId: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING
            },
            password: {
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
            modelName: "user_credentials",
            sequelize,
            timestamps: true
        },
    )

    /**
     * Compare user provided password with DB password hash
     */
    UserCredentialsModel.prototype.isValidPassword = function (password: string) {
        if (isEmpty(this.password)) {
            return true
        }
        throwIf(isEmpty(password), Errors.REJECTED_Password())
        return bcrypt.compareSync(password, this.password)
    }

    /**
     * Deletes password from returned values
     */
    UserCredentialsModel.prototype.toJSON = function (): object {
        const values = Object.assign({}, this.get())
        delete values.password
        return values
    }

    return UserCredentialsModel
}
