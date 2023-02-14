import {DataTypes, QueryInterface} from "sequelize"
import {Migration} from "../umzug"

export const up: Migration = async ({context: queryInterface}: { context: QueryInterface }) => {
    await queryInterface.createTable("wallets", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        address: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        type: {
            allowNull: false,
            type: DataTypes.STRING
        },
        user_uuid: {
            allowNull: false,
            type: DataTypes.UUID
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

    await queryInterface.addConstraint("wallets", {
        fields: ["owner_identifier", "type"],
        type: "unique",
        name: "unique_wallet_type_per_user",
    })

}

export async function down({context: queryInterface}) {
    await queryInterface.dropTable("wallets")
}
