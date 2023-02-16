import {ApiModule} from "../enums"
import {ApplicationScopeModel} from "../models"
import Errors from "../utils/errors/Errors"
import {eq, Filter, throwIfNull} from "@d-lab/api-kit"
import db from "../db/database"

export default class ApplicationScopeService {

    async get(applicationId: number, module: ApiModule): Promise<ApplicationScopeModel> {
        const scope = await this.findOne(eq({applicationId, module}))
        throwIfNull(scope, Errors.NOT_FOUND_ApplicationScope(applicationId, module))
        return scope!
    }

    async findAll(filter: Filter): Promise<ApplicationScopeModel[]> {
        return await db.ApplicationScopes.findAll(filter.get())
    }

    async findOne(filter: Filter): Promise<ApplicationScopeModel | null> {
        return await db.ApplicationScopes.findOne(filter.get())
    }

    async getAll(applicationId: number): Promise<ApplicationScopeModel[]> {
        return this.findAll(eq({applicationId}))
    }

    async addScope(applicationId: number, module: ApiModule): Promise<ApplicationScopeModel> {
        return await db.ApplicationScopes.create({
            applicationId: applicationId,
            module: module
        })
    }

    async deleteScope(applicationId: number, module: ApiModule): Promise<ApplicationScopeModel> {
        const scope = await this.get(applicationId, module)
        await scope.destroy()
        return scope
    }
}