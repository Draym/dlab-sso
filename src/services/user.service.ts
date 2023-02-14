import db from "../db/database"
import {User} from "../interfaces"
import * as bcrypt from "bcryptjs"
import {verificationCodeService} from "."
import {UserModel} from "../models"
import {redisDelSuffix} from "../clients/redis.client"
import {isEmpty, isNotNull, throwIfNot, throwIfNull} from "../utils/validators/checks"
import {VerificationCodeTarget} from "../enums"
import Errors from "../utils/errors/Errors"
import {Op} from "sequelize"
import {Filter} from "@delysium/api-kit"

export default class UserService {
    public users = db.Users

    public async getAllUser(): Promise<User[]> {
        return await this.users.findAll()
    }

    public async getById(userId: number): Promise<UserModel> {
        const findUser = await this.users.findByPk(userId)
        throwIfNull(findUser, Errors.NOT_FOUND_UserId(userId))
        return findUser!
    }

    public async getByEmail(email: string): Promise<UserModel> {
        const findUser = await this.findByEmail(email)
        throwIfNull(findUser, Errors.NOT_FOUND_UserEmail(email))
        return findUser!
    }

    public async getByIdentifier(identifier: string): Promise<UserModel> {
        const findUser = await this.findByIdentifier(identifier)
        throwIfNull(findUser, Errors.NOT_FOUND_User(identifier))
        return findUser!
    }

    public async findById(id: number): Promise<UserModel | null> {
        return await db.Users.findOne({
            where: {id: id}
        })
    }

    public async findByEmail(email: string): Promise<UserModel | null> {
        return await db.Users.findOne({
            where: {email: email}
        })
    }

    public async findByIdentifier(identifier: string): Promise<UserModel | null> {
        return await db.Users.findOne({
            where: {identifier: identifier}
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

    async findAll(filter: Filter): Promise<User[]> {
        return db.Users.findAll(filter.get())
    }

    async findOne(filter: Filter): Promise<User | null> {
        return db.Users.findOne(filter.get())
    }

    public async emailExists(email: string): Promise<boolean> {
        return await db.Users.findOne({
            where: {email: email}
        }) != undefined
    }

    public async createUser(email: string, password: string, emailVerificationCode: number | undefined): Promise<UserModel> {
        if (isNotNull(emailVerificationCode)) {
            await verificationCodeService.checkValidityAndDestroy(email, emailVerificationCode!, VerificationCodeTarget.Register)
        }

        if (await this.emailExists(email)) {
            throw Errors.CONFLICT_Email(email)
        }
        const hashedPassword = isEmpty(password) ? password : await bcrypt.hash(password, 10)
        return await db.Users.create({
            email: email,
            password: hashedPassword
        })
    }

    public async updateEmail(userId: number, newEmail: string, emailVerificationCode: number): Promise<void> {
        await verificationCodeService.checkValidityAndDestroy(newEmail, emailVerificationCode, VerificationCodeTarget.EmailUpdate)

        const existingUser = await this.findByEmail(newEmail)
        if (isNotNull(existingUser)) {
            if (existingUser!.id === userId) {
                throw Errors.CONFLICT_SameEmail(newEmail)
            } else {
                throw Errors.CONFLICT_Email(newEmail)
            }
        }
        const user = await this.getById(userId)
        await user.update({
            email: newEmail,
        })
    }

    public async updateEmailByEmail(oldEmail: string, oldEmailVerificationCode: number, newEmail: string, newEmailVerificationCode: number): Promise<void> {
        await verificationCodeService.checkValidityAndDestroy(oldEmail, oldEmailVerificationCode, VerificationCodeTarget.EmailUpdate)
        await verificationCodeService.checkValidityAndDestroy(newEmail, newEmailVerificationCode, VerificationCodeTarget.EmailUpdate)

        if (await this.emailExists(newEmail)) {
            throw Errors.CONFLICT_Email(newEmail)
        }
        const user = await this.getByEmail(oldEmail)
        await user.update({
            email: newEmail,
        })
    }

    public async updatePassword(userId: number, oldPassword: string | undefined, newPassword: string): Promise<void> {
        const user = await this.getById(userId)

        if (isNotNull(oldPassword)) {
            throwIfNot(user.isValidPassword(oldPassword!), Errors.REJECTED_Password())
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        await user.update({
            password: hashedPassword,
        })
    }

    public async updatePasswordByEmail(email: string, newPassword: string, verificationCode: number): Promise<void> {
        await verificationCodeService.checkValidityAndDestroy(email, verificationCode, VerificationCodeTarget.PasswordUpdate)

        const user = await this.getByEmail(email)

        await user.update({
            password: await bcrypt.hash(newPassword, 10)
        })
        await redisDelSuffix(`${user.id}_`)
    }

    public async resetPassword(email: string, newPassword: string, verificationCode: number): Promise<void> {
        await verificationCodeService.checkValidityAndDestroy(email, verificationCode, VerificationCodeTarget.PasswordReset)

        const user = await this.getByEmail(email)

        await user.update({
            password: await bcrypt.hash(newPassword, 10)
        })
        await redisDelSuffix(`${user.id}_`)
    }

    public async suspendUser(userId: number, suspended: boolean): Promise<void> {
        const user = await this.getById(userId)
        await user.update({
            suspended: suspended
        })
    }

    public async unsuspendUser(userId: number): Promise<void> {
        const user = await this.getById(userId)
        await user.update({
            suspended: false
        })
    }
}