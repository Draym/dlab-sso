import db from "../db/database"
import {ApplicationUser} from "../interfaces"
import {ApplicationUserModel} from "../models"
import Errors from "../utils/errors/Errors"
import {Role} from "../enums"
import {isAllowed} from "../enums/role.enum"
import {isNull, throwIfNull} from "@d-lab/common-kit"

export default class ApplicationUserService {

    async find(id: number): Promise<ApplicationUserModel | null> {
        return db.ApplicationUsers.findByPk(id)
    }
    async get(id: number): Promise<ApplicationUserModel> {
        const user = await this.find(id)
        throwIfNull(user, Errors.NOT_FOUND_ApplicationUser(`id[${id}]`))
        return user!
    }

    public async getUsers(applicationId: number): Promise<ApplicationUser[]> {
        return await db.ApplicationUsers.findAll({
            where: {
                applicationId: applicationId
            }
        })
    }

    public async getUser(applicationId: number, userId: number): Promise<ApplicationUserModel> {
        const item = await this.findUser(applicationId, userId)
        throwIfNull(item, Errors.NOT_FOUND_ApplicationUser(`application[${applicationId}] and user[${userId}]`))
        return item!
    }

    public async findUser(applicationId: number, userId: number): Promise<ApplicationUserModel | null> {
        return await db.ApplicationUsers.findOne({
            where: {
                applicationId: applicationId,
                userId: userId
            }
        })
    }

    public async isUserAllowed(applicationId: number, userId: number, role: Role, strict: boolean): Promise<boolean> {
        const user = await this.findUser(applicationId, userId)
        if (isNull(user)) {
            return false
        }
        return isAllowed(user!.role, role, strict)
    }

    public async create(applicationId: number, userId: number, role: Role): Promise<ApplicationUserModel> {
        return await db.ApplicationUsers.create({
            applicationId: applicationId,
            userId: userId,
            role: role
        })
    }

    public async update(applicationId: number, userId: number, role: Role): Promise<ApplicationUserModel> {
        const user = await this.getUser(applicationId, userId)
        await user.update({
            role: role
        })
        return user
    }

    public async delete(applicationId: number, userId: number): Promise<ApplicationUserModel> {
        const user = await this.getUser(applicationId, userId)
        await user.destroy()
        return user
    }
}