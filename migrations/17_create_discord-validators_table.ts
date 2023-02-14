import {DataTypes, QueryInterface} from "sequelize"
import {Migration} from "../umzug"

export const up: Migration = async ({context: queryInterface}: { context: QueryInterface }) => {
    await queryInterface.createTable("discord_validators", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        discord_id: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        discord_token: {
            allowNull: false,
            type: DataTypes.STRING
        },
        discord_scope: {
            allowNull: false,
            type: DataTypes.STRING
        },
        request_nonce: {
            allowNull: false,
            type: DataTypes.STRING
        },
        auth_key: {
            allowNull: false,
            type: DataTypes.STRING
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
}

export async function down({context: queryInterface}) {
    await queryInterface.dropTable("discord_validators")
}
