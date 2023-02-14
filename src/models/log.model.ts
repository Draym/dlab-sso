import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import {Log} from "../interfaces"
import {LogEvent, LogScope} from "../enums"

export type LogCreationAttributes = Optional<Log, "id" | "createdAt">

export default class LogModel extends Model<Log, LogCreationAttributes> implements Log {
    public id: number
    public scope: LogScope
    public event: LogEvent
    public code: string | null
    public message: string | null
    public createdAt: Date
    public createdBy: string
}

export const init = (sequelize: Sequelize): typeof LogModel => {
    // Init all models
    LogModel.init(
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            scope: {
                allowNull: false,
                type: DataTypes.STRING
            },
            event: {
                allowNull: false,
                type: DataTypes.STRING
            },
            code: {
                allowNull: true,
                type: DataTypes.STRING
            },
            message: {
                allowNull: true,
                type: DataTypes.STRING
            },
            createdBy: {
                allowNull: false,
                type: DataTypes.STRING
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: Sequelize.fn("NOW")
            }
        },
        {
            underscored: true,
            modelName: "logs",
            sequelize,
            timestamps: false
        },
    )
    return LogModel
}
