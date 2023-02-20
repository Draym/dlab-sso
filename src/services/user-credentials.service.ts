import {eq, Filter, isNotNull, throwIfNot, throwIfNull} from "@d-lab/api-kit"
import Errors from "../utils/errors/Errors"
import {userService, verificationCodeService} from "./index"
import {VerificationCodeTarget} from "../enums"
import {UserCredentialsModel} from "../models"
import db from "../db/database"
import * as bcrypt from "bcryptjs"

export default class UserCredentialsService {

    async find(id: number): Promise<UserCredentialsModel | null> {
        return db.UserCredentials.findByPk(id)
    }

    async get(id: number): Promise<UserCredentialsModel> {
        const user = await this.find(id)
        throwIfNull(user, Errors.NOT_FOUND_UserCredentials(`id[${id}]`))
        return user!
    }

    public async getBy(filter: Filter): Promise<UserCredentialsModel> {
        const user = await this.findBy(filter)
        throwIfNull(user, Errors.NOT_FOUND_UserCredentials(filter.stringify()))
        return user!
    }

    public async findBy(filter: Filter): Promise<UserCredentialsModel | null> {
        return await db.UserCredentials.findOne(filter.get())
    }

    public async emailExists(email: string): Promise<boolean> {
        return await db.Users.findOne({
            where: {email: email}
        }) != undefined
    }

    public async create(userId: number, email: string, password: string): Promise<UserCredentialsModel> {
        const hashedPassword = await bcrypt.hash(password, 10)
        return await db.UserCredentials.create({
            userId: userId,
            email: email,
            password: hashedPassword
        })
    }

    public async updatePassword(userId: number, oldPassword: string | undefined, newPassword: string): Promise<void> {
        const credentials = await this.get(userId)

        if (isNotNull(oldPassword)) {
            throwIfNot(credentials.isValidPassword(oldPassword!), Errors.REJECTED_Password())
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        await credentials.update({
            password: hashedPassword,
        })
    }

    public async updatePasswordByEmail(email: string, newPassword: string, verificationCode: number): Promise<void> {
        await verificationCodeService.checkValidityAndDestroy(email, verificationCode, VerificationCodeTarget.PasswordUpdate)

        const credentials = await this.getBy(eq({email}))

        await credentials.update({
            password: await bcrypt.hash(newPassword, 10)
        })
    }

    public async resetPassword(email: string, newPassword: string, verificationCode: number): Promise<void> {
        await verificationCodeService.checkValidityAndDestroy(email, verificationCode, VerificationCodeTarget.PasswordReset)

        const credentials = await this.getBy(eq({email}))

        await credentials.update({
            password: await bcrypt.hash(newPassword, 10)
        })
    }

    public async updateEmail(userId: number, newEmail: string, emailVerificationCode: number): Promise<void> {
        await verificationCodeService.checkValidityAndDestroy(newEmail, emailVerificationCode, VerificationCodeTarget.EmailUpdate)

        const existingUser = await this.findBy(eq({email: newEmail}))
        if (isNotNull(existingUser)) {
            if (existingUser!.id === userId) {
                throw Errors.CONFLICT_SameEmail(newEmail)
            } else {
                throw Errors.CONFLICT_Email(newEmail)
            }
        }
        const credentials = await this.get(userId)
        const user = await userService.get(userId)
        await credentials.update({
            email: newEmail,
        })
        await user.update({
            email: newEmail
        })
    }

    public async updateEmailByEmail(oldEmail: string, oldEmailVerificationCode: number, newEmail: string, newEmailVerificationCode: number): Promise<void> {
        await verificationCodeService.checkValidityAndDestroy(oldEmail, oldEmailVerificationCode, VerificationCodeTarget.EmailUpdate)
        await verificationCodeService.checkValidityAndDestroy(newEmail, newEmailVerificationCode, VerificationCodeTarget.EmailUpdate)

        if (await this.emailExists(newEmail)) {
            throw Errors.CONFLICT_Email(newEmail)
        }
        const credentials = await this.getBy(eq({email: oldEmail}))
        const user = await userService.get(credentials.userId)
        await credentials.update({
            email: newEmail,
        })
        await user.update({
            email: newEmail
        })
    }
}