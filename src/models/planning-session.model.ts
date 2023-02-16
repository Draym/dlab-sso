import {DataTypes, Model, Optional, Sequelize} from "sequelize"
import {PlanningSession} from "../interfaces"
import {SessionType} from "../enums"

export type PlanningSessionsCreationAttributes = Optional<PlanningSession, "id" | "createdAt" | "updatedAt">

export default class PlanningSessionModel
    extends Model<PlanningSession, PlanningSessionsCreationAttributes>
    implements PlanningSession {
    public id!: number
    public start!: Date
    public end!: Date
    public type!: SessionType
    public serviceUuid: string
    public createdAt!: Date
    public updatedAt!: Date
}

export const init = (sequelize: Sequelize): typeof PlanningSessionModel => {
    PlanningSessionModel.init(
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            start: {
                allowNull: false,
                type: DataTypes.DATE
            },
            end: {
                allowNull: false,
                type: DataTypes.DATE
            },
            type: {
                allowNull: false,
                type: DataTypes.STRING
            },
            serviceUuid: {
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
            modelName: "planning_sessions",
            sequelize,
            timestamps: true
        },
    )

    return PlanningSessionModel
}
