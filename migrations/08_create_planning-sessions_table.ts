import {DataTypes, QueryInterface} from "sequelize"
import {Migration} from "../umzug"

export const up: Migration = async ({context: queryInterface}: { context: QueryInterface }) => {
    await queryInterface.createTable("planning_sessions", {
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
        serviceId: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        created_at: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updated_at: {
            allowNull: false,
            type: DataTypes.DATE
        }
    })

    await queryInterface.addConstraint("planning_sessions", {
        fields: ["type", "start", "end"],
        type: "unique",
        name: "unique_planning_session"
    })
}

export async function down({context: queryInterface}) {
    await queryInterface.dropTable("planning_sessions")
}