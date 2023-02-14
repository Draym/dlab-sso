import {DataTypes, QueryInterface} from "sequelize"
import {Migration} from "../umzug"

export const up: Migration = async ({context: queryInterface}: { context: QueryInterface }) => {
    await queryInterface.createTable("application_scopes", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        application_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        module: {
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

    await queryInterface.addConstraint("application_scopes", {
        fields: ["application_id", "module"],
        type: "unique",
        name: "unique_application_scope",
    })
}

export async function down({context: queryInterface}) {
    await queryInterface.dropTable("application_scopes")
}
