import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import {VerificationCode} from "../interfaces"
import {VerificationCodeTarget} from "../enums"

export type VerificationCodeCreationAttributes = Optional<VerificationCode, "id" | "createdAt" | "updatedAt">

export default class VerificationCodeModel
    extends Model<VerificationCode, VerificationCodeCreationAttributes>
    implements VerificationCode {
    public id!: number
    public email!: string
    public verificationCode!: number
    public validUntil!: Date
    public target!: VerificationCodeTarget
    public createdAt!: Date
    public updatedAt!: Date
}

export const init = (sequelize: Sequelize): typeof VerificationCodeModel => {
    VerificationCodeModel.init(
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING
            },
            verificationCode: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            validUntil: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            target: {
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
            modelName: "verification_codes",
            sequelize,
            timestamps: true,
        },
    )

    return VerificationCodeModel
}
