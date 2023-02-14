import {ApiModule} from "../enums"
import {ApplicationScopeModel} from "../models"
import db from "../db/database"
import {throwIfNull} from "../utils/validators/checks"
import Errors from "../utils/errors/Errors"

export default class ApplicationScopeService {
    public applicationScopes = db.ApplicationScopes

    async getScope(applicationId: number, module: ApiModule): Promise<ApplicationScopeModel> {
        const scope = await this.findScope(applicationId, module)
        throwIfNull(scope, Errors.NOT_FOUND_ApplicationScope(applicationId, module))
        return scope!
    }

    async findAllByAppIds(applicationIds: number[]): Promise<ApplicationScopeModel[]> {
        return await this.applicationScopes.findAll({
            where: {
                applicationId: applicationIds
            }
        })
    }

    async findScope(applicationId: number, module: ApiModule): Promise<ApplicationScopeModel | null> {
        return await this.applicationScopes.findOne({
            where: {
                applicationId: applicationId,
                module: module
            }
        })
    }

    async getScopes(applicationId: number): Promise<ApplicationScopeModel[]> {
        return await this.applicationScopes.findAll({
            where: {
                applicationId: applicationId
            }
        })
    }

    async addScope(applicationId: number, module: ApiModule): Promise<ApplicationScopeModel> {
        return await this.applicationScopes.create({
            applicationId: applicationId,
            module: module
        })
    }

    async deleteScope(applicationId: number, module: ApiModule): Promise<ApplicationScopeModel> {
        const scope = await this.getScope(applicationId, module)
        await scope.destroy()
        return scope
    }
}