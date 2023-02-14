import {DataTypes, QueryInterface} from "sequelize"
import {Migration} from "../umzug"

export const up: Migration = async ({context: queryInterface}: { context: QueryInterface }) => {
    await queryInterface.createTable("applications", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        owner_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        description: {
            allowNull: false,
            type: DataTypes.STRING
        },
        api_key: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        type: {
            allowNull: false,
            type: DataTypes.STRING
        },
        access_type: {
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

    await queryInterface.addConstraint("applications", {
        fields: ["owner_id", "name"],
        type: "unique",
        name: "unique_owner_application_name",
    })
}

export async function down({context: queryInterface}) {
    await queryInterface.dropTable("applications")
}
