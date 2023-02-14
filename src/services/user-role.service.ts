import {Role} from "../enums";
import db from "../db/database";
import {UserRoleModel} from "../models";
import {isNotNull, throwIfNull} from "../utils/validators/checks";
import Errors from "../utils/errors/Errors";

export default class UserRoleService {

    public async findAll(): Promise<UserRoleModel[]> {
        return await db.UserRoles.findAll()
    }

    public async findByRole(role: Role): Promise<UserRoleModel[]> {
        return await db.UserRoles.findAll({
            where: {
                role: role
            }
        })
    }

    public async findByUserId(userId: number): Promise<UserRoleModel | null> {
        return await db.UserRoles.findOne({
            where: {
                userId: userId
            }
        })
    }

    public async findByUserIds(userIds: number[]): Promise<UserRoleModel[]> {
        return await db.UserRoles.findAll({
            where: {
                userId: userIds
            }
        })
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
        const userRole = await this.findByUserId(userId)
        return isNotNull(userRole) ? userRole!.role : Role.User
    }

    public async hasRole(userId: number, role: Role): Promise<boolean> {
        const current = await this.findByUserId(userId)
        return isNotNull(current) && current!.role === role
    }

    public async hasAnyRole(userId: number, roles: Role[]): Promise<boolean> {
        const current = await this.findByUserId(userId)
        return isNotNull(current) && roles.includes(current!.role)
    }
}