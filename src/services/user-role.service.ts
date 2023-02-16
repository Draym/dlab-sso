import {Role} from "../enums";
import db from "../db/database";
import {UserRoleModel} from "../models";
import Errors from "../utils/errors/Errors";
import {eq, Filter, isNotNull, throwIfNull} from "@d-lab/api-kit"

export default class UserRoleService {

    public async getAll(): Promise<UserRoleModel[]> {
        return await db.UserRoles.findAll()
    }

    public async findAll(filter: Filter): Promise<UserRoleModel[]> {
        return await db.UserRoles.findAll(filter.get())
    }

    public async findBy(filter: Filter): Promise<UserRoleModel | null> {
        return await db.UserRoles.findOne(filter.get())
    }


    public async update(userId: number, role: Role): Promise<void> {
        const userRole = await db.UserRoles.findOne({
            where: {
                userId: userId
            }
        })
        if (isNotNull(userRole)) {
            await userRole!.update({
                role: role
            })
        } else {
            await db.UserRoles.create({
                userId: userId,
                role: role
            })
        }
    }

    public async delete(userId: number, role: Role): Promise<void> {
        const userRole = await db.UserRoles.findOne({
            where: {
                userId: userId,
                role: role
            }
        })

        throwIfNull(userRole, Errors.NOT_FOUND_Role(userId, role))

        await userRole!.destroy()
    }

    public async getUserRole(userId: number): Promise<Role> {
        const userRole = await this.findBy(eq({userId}))
        return isNotNull(userRole) ? userRole!.role : Role.User
    }

    public async hasRole(userId: number, role: Role): Promise<boolean> {
        const current = await this.findBy(eq({userId}))
        return isNotNull(current) && current!.role === role
    }

    public async hasAnyRole(userId: number, roles: Role[]): Promise<boolean> {
        const current = await this.findBy(eq({userId}))
        return isNotNull(current) && roles.includes(current!.role)
    }
}