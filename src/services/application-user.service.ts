import db from "../db/database"
import {ApplicationUser} from "../interfaces"
import {ApplicationUserModel} from "../models"
import {isNull, throwIfNull} from "../utils/validators/checks"
import Errors from "../utils/errors/Errors"
import {Role} from "../enums"
import {isAllowed} from "../enums/role.enum"

export default class ApplicationUserService {
    public applicationUsers = db.ApplicationUsers

    public async getUsers(applicationId: number): Promise<ApplicationUser[]> {
        return await this.applicationUsers.findAll({
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
        return await this.applicationUsers.findOne({
            where: {
                applicationId: applicationId,
                userId: userId
            }
        })
    }

    public async getById(id: number): Promise<ApplicationUserModel> {
        const item = await this.findById(id)
        throwIfNull(item, Errors.NOT_FOUND_ApplicationUser(`id[${id}]`))
        return item!
    }

    public async findById(id: number): Promise<ApplicationUserModel | null> {
        return await this.applicationUsers.findByPk(id)
    }

    public async isUserAllowed(applicationId: number, userId: number, role: Role, strict: boolean): Promise<boolean> {
        const user = await this.findUser(applicationId, userId)
        if (isNull(user)) {
            return false
        }
        return isAllowed(user!.role, role, strict)
    }

    public async create(applicationId: number, userId: number, role: Role): Promise<ApplicationUserModel> {
        return await this.applicationUsers.create({
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