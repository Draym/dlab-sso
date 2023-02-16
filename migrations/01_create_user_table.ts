import {DataTypes, QueryInterface} from "sequelize"
import {Migration} from "../umzug"

export const up: Migration = async ({context: queryInterface}: { context: QueryInterface }) => {
    await queryInterface.createTable("users", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        uuid: {
            allowNull: false,
            type: DataTypes.UUID,
            unique: true
        },
        email: {
            allowNull: true,
            type: DataTypes.STRING,
            unique: true
        },
        suspended: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: false
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
    await queryInterface.dropTable("users")
}
