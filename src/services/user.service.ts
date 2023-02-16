import db from "../db/database"
import {User} from "../interfaces"
import {UserModel} from "../models"
import Errors from "../utils/errors/Errors"
import {Filter, isNotNull, Page, throwIfNull} from "@d-lab/api-kit"

export default class UserService {

    public async getAll(): Promise<User[]> {
        return await db.Users.findAll()
    }

    async findBy(filter: Filter): Promise<User | null> {
        return db.Users.findOne(filter.get())
    }

    async findAll(filter: Filter, page: Page): Promise<User[]> {
        return db.Users.findAll(page.paginate(filter.get()))
    }
    async find(id: number): Promise<UserModel | null> {
        return db.Users.findByPk(id)
    }
    async get(id: number): Promise<UserModel> {
        const user = await this.find(id)
        throwIfNull(user, Errors.NOT_FOUND_User(`id[${id}]`))
        return user!
    }

    public async getByEmail(email: string): Promise<UserModel> {
        const findUser = await this.findByEmail(email)
        throwIfNull(findUser, Errors.NOT_FOUND_User(`email[${email}]`))
        return findUser!
    }

    public async getByUuid(uuid: string): Promise<UserModel> {
        const findUser = await this.findByUuid(uuid)
        throwIfNull(findUser, Errors.NOT_FOUND_User(`uuid[${uuid}]`))
        return findUser!
    }

    public async findByEmail(email: string): Promise<UserModel | null> {
        return await db.Users.findOne({
            where: {email: email}
        })
    }

    public async findByUuid(uuid: string): Promise<UserModel | null> {
        return await db.Users.findOne({
            where: {uuid: uuid}
        })
    }

    public async findByIds(ids: number[]): Promise<UserModel[]> {
        return await db.Users.findAll({
            where: {id: ids}
        })
    }

    public async findByEmails(emails: string[]): Promise<UserModel[]> {
        return await db.Users.findAll({
            where: {email: emails}
        })
    }

    public async emailExists(email: string): Promise<boolean> {
        return await db.Users.findOne({
            where: {email: email}
        }) != undefined
    }

    public async create(email: string | null = null): Promise<UserModel> {
        if (isNotNull(email) && await this.emailExists(email!)) {
            throw Errors.CONFLICT_Email(email!)
        }
        return await db.Users.create({
            email: email
        })
    }

    public async suspendUser(userId: number, suspended: boolean): Promise<void> {
        const user = await this.get(userId)
        await user.update({
            suspended: suspended
        })
    }

    public async unsuspendUser(userId: number): Promise<void> {
        const user = await this.get(userId)
        await user.update({
            suspended: false
        })
    }
}