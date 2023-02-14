import {DataTypes, QueryInterface} from "sequelize"
import {Migration} from "../umzug"

export const up: Migration = async ({context: queryInterface}: { context: QueryInterface }) => {
    await queryInterface.createTable("verification_codes", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING
        },
        valid_until: {
            allowNull: false,
            type: DataTypes.DATE
        },
        verification_code: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        target: {
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

    await queryInterface.addConstraint("verification_codes", {
        fields: ["email", "target"],
        type: "unique",
        name: "unique_email_target"
    })
}

export async function down({context: queryInterface}) {
    await queryInterface.dropTable("verification_codes")
}
