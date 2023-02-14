import { DataTypes, QueryInterface } from "sequelize"
import { Migration } from "../umzug"

export const up: Migration = async ({ context: queryInterface }: { context: QueryInterface }) => {
  await queryInterface.createTable("whitelist", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    }
  })
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable("whitelist")
}
