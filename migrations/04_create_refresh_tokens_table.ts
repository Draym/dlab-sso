import {DataTypes, QueryInterface} from "sequelize"
import {Migration} from "../umzug"

export const up: Migration = async ({context: queryInterface}: { context: QueryInterface }) => {
    await queryInterface.createTable("refresh_tokens", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        user_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            unique: true
        },
        valid_until: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        token: {
            allowNull: false,
            type: DataTypes.STRING(555),
        }
    })
}

export async function down({context: queryInterface}) {
    await queryInterface.dropTable("refresh_tokens")
}
