import { QueryInterface } from "sequelize"
import { Migration } from "../umzug"
import {Role} from "../src/enums"

export const up: Migration = async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.insert(null, "user_roles", {
        user_id: 1,
        role: Role.Admin
    })
}

export async function down({ context: queryInterface }) {
    await queryInterface.delete(null, "user_roles", {
        user_id: 1,
        role: Role.Admin
    })
}