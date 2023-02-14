import { DataTypes, QueryInterface } from "sequelize"
import { Migration } from "../umzug"

export const up: Migration = async ({ context: queryInterface }: { context: QueryInterface }) => {
  await queryInterface.createTable("user_roles", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_uuid: {
      allowNull: false,
      type: DataTypes.UUID,
      unique: true
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING
    }
  })
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable("user_roles")
}
