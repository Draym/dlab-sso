import db from "../db/database"
import {Filter, Page, throwIfNull} from "@d-lab/api-kit"
import {User} from "../interfaces"
import {UserModel} from "../models"
import Errors from "../utils/errors/Errors"

class UserService {

    async create(name: string, email: string | null): Promise<UserModel> {
        return await db.Users.create({
            name: name,
            email: email
        })
    }
    async findAll(filter: Filter, page: Page): Promise<User[]> {
        return db.Users.findAll(page.paginate(filter.get()))
    }
    async findById(id: number): Promise<UserModel | null> {
        return db.Users.findByPk(id)
    }
    async getById(id: number): Promise<UserModel> {
        const user = await this.findById(id)
        throwIfNull(user, Errors.NOT_FOUND_User(`NotFound for id[${id}]`))
        return user!
    }
}

export default new UserService()