import {DataTypes, QueryInterface} from "sequelize"
import {Migration} from "../umzug"

export const up: Migration = async ({context: queryInterface}: { context: QueryInterface }) => {
    await queryInterface.createTable("users", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        identifier: {
            allowNull: false,
            type: DataTypes.UUID,
            unique: "identifier"
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: "email"
        },
        created_at: {
            allowNull: false,
            type: DataTypes.DATE
        }
    })
}

export async function down({context: queryInterface}) {
    await queryInterface.dropTable("users")
}
