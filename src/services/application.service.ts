import db, {sequelize} from "../db/database"
import {ApplicationModel} from "../models"
import {throwIf, throwIfNot, throwIfNull} from "../utils/validators/checks"
import Errors from "../utils/errors/Errors"
import {ApiAccessRequire, ApiAccessType, ApiModule} from "../enums"
import {v4 as uuidv4} from 'uuid'
import * as bcrypt from "bcryptjs"
import {applicationScopeService, applicationService, applicationUserService, userRolesService} from "./index"
import Role, {AdministrativeRoles, StaffRoles} from "../enums/role.enum"
import {replaceAll} from "../utils/string"

export default class ApplicationService {
    public applications = db.Applications

    async getById(applicationId: number): Promise<ApplicationModel> {
        const scope = await this.findById(applicationId)
        throwIfNull(scope, Errors.NOT_FOUND_Application(`id[${applicationId}`))
        return scope!
    }

    async findById(applicationId: number): Promise<ApplicationModel | null> {
        return await this.applications.findByPk(applicationId)
    }

    async getByApiKey(apiKey: string): Promise<ApplicationModel> {
        const scope = await this.findByApiKey(apiKey)
        throwIfNull(scope, Errors.NOT_FOUND_Application(`apiKey[${apiKey}]`))
        return scope!
    }

    async findByApiKey(apiKey: string): Promise<ApplicationModel | null> {
        return await this.applications.findOne({
            where: {
                apiKey: await ApplicationService.hashApiKey(apiKey)
            }
        })
    }

    async getAll(): Promise<ApplicationModel[]> {
        return await this.applications.findAll()
    }

    async findAllByOwner(ownerId: number): Promise<ApplicationModel[]> {
        return await this.applications.findAll({
            where: {
                ownerId: ownerId
            }
        })
    }

    async requireOwnership(applicationId: number, callerId: number) {
        const application = await applicationService.getById(applicationId)
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

            const application = await this.applications.create({
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
                await applicationScopeService.applicationScopes.create({
                    applicationId: application.id,
                    module: module
                }, {transaction: t})
            }
            await applicationUserService.create(application.id, application.ownerId, Role.Admin)
            return apiKey
        })
    }

    async delete(applicationId: number, callerId: number): Promise<ApplicationModel> {
        const application = await this.getById(applicationId)
        throwIf(application.ownerId !== callerId, Errors.REQUIRE_Ownership(`You are not the owner of application[${applicationId}]`))

        await application.destroy()
        return application
    }

    async generateNewApiKey(applicationId: number, callerId: number): Promise<string> {
        const application = await this.getById(applicationId)
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