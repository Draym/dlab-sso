import db, {sequelize} from "../db/database"
import {ApplicationModel} from "../models"
import Errors from "../utils/errors/Errors"
import {ApiAccessRequire, ApiAccessType, ApiModule} from "../enums"
import {v4 as uuidv4} from 'uuid'
import * as bcrypt from "bcryptjs"
import { applicationService, applicationUserService, userRolesService} from "./index"
import Role, {AdministrativeRoles} from "../enums/role.enum"
import {Filter, Page, throwIf, throwIfNot, throwIfNull, replaceAll} from "@d-lab/api-kit"

export default class ApplicationService {

    public async getAll(): Promise<ApplicationModel[]> {
        return await db.Applications.findAll()
    }

    async findBy(filter: Filter): Promise<ApplicationModel | null> {
        return db.Applications.findOne(filter.get())
    }

    async getBy(filter: Filter): Promise<ApplicationModel> {
        const app = await this.findBy(filter)
        throwIfNull(app, Errors.NOT_FOUND_Application(filter.stringify()))
        return app!
    }

    async findAll(filter: Filter): Promise<ApplicationModel[]> {
        return db.Applications.findAll(filter.get())
    }
    async find(id: number): Promise<ApplicationModel | null> {
        return db.Applications.findByPk(id)
    }
    async get(id: number): Promise<ApplicationModel> {
        const app = await this.find(id)
        throwIfNull(app, Errors.NOT_FOUND_Application(`id[${id}`))
        return app!
    }

    async getByApiKey(apiKey: string): Promise<ApplicationModel> {
        const scope = await this.findByApiKey(apiKey)
        throwIfNull(scope, Errors.NOT_FOUND_Application(`apiKey[${apiKey}]`))
        return scope!
    }

    async findByApiKey(apiKey: string): Promise<ApplicationModel | null> {
        return await db.Applications.findOne({
            where: {
                apiKey: await ApplicationService.hashApiKey(apiKey)
            }
        })
    }

    async requireOwnership(applicationId: number, callerId: number) {
        const application = await applicationService.get(applicationId)
        throwIf(application.ownerId !== callerId, Errors.REQUIRE_Ownership(`You are not the owner of application[${applicationId}]`))
    }

    async create(ownerId: number, name: string, description: string, type: ApiAccessType, accessType: ApiAccessRequire, modules: ApiModule[]): Promise<string> {
        if (type != ApiAccessType.Personal) {
            const role = await userRolesService.getUserRole(ownerId)
            throwIfNot(AdministrativeRoles.includes(role), Errors.REQUIRE_Role("Admin, Moderator"))
            throwIf(accessType !== ApiAccessRequire.Read && role !== Role.Admin, Errors.REQUIRE_Role("Admin"))
        }

        return await sequelize.transaction(async (t) => {
            const apiKey = ApplicationService.newApiKey()

            const application = await db.Applications.create({
                ownerId: ownerId,
                name: name,
                description: description,
                apiKey: await ApplicationService.hashApiKey(apiKey),
                type: type,
                accessType: accessType
            }, {transaction: t})

            if (!modules.includes(ApiModule.Application)) {
                modules.push(ApiModule.Application)
            }

            for (const module of modules) {
                await db.ApplicationScopes.create({
                    applicationId: application.id,
                    module: module
                }, {transaction: t})
            }
            await applicationUserService.create(application.id, application.ownerId, Role.Admin)
            return apiKey
        })
    }

    async delete(applicationId: number, callerId: number): Promise<ApplicationModel> {
        const application = await this.get(applicationId)
        throwIf(application.ownerId !== callerId, Errors.REQUIRE_Ownership(`You are not the owner of application[${applicationId}]`))

        await application.destroy()
        return application
    }

    async generateNewApiKey(applicationId: number, callerId: number): Promise<string> {
        const application = await this.get(applicationId)
        throwIf(application.ownerId !== callerId, Errors.REQUIRE_Ownership(`You are not the owner of application[${applicationId}]`))

        const apiKey = ApplicationService.newApiKey()

        await application.update({
            apiKey: await ApplicationService.hashApiKey(apiKey)
        })
        return apiKey
    }

    private static newApiKey(): string {
        return replaceAll(uuidv4(), "-", "")
    }

    private static async hashApiKey(apiKey: string): Promise<string> {
        return await bcrypt.hash(apiKey, "$2a$04$apikey1111112222333344")
    }
}