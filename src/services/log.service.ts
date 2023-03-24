import {LogEvent, LogScope} from "../enums"
import db from "../db/database"
import {Filter, Page} from "@d-lab/api-kit"
import {throwIfNull} from "@d-lab/common-kit"
import {Log} from "../interfaces"
import Errors from "../utils/errors/Errors"
import {LogModel} from "../models"

class LogService {
    async create(scope: LogScope, event: LogEvent, by: string, message: string | null = null, code: string | null = null): Promise<LogModel> {
       return await db.Logs.create({
            scope: scope,
            event: event,
            message: message,
            code: code,
            createdBy: by
        })
    }
    async findAll(filter: Filter): Promise<Log[]> {
        return db.Logs.findAll(filter.get())
    }
    async find(id: number): Promise<LogModel | null> {
        return db.Logs.findByPk(id)
    }
    async get(id: number): Promise<LogModel> {
        const log = await this.find(id)
        throwIfNull(log, Errors.NOT_FOUND_Log(`NotFound for id[${id}]`))
        return log!
    }
}

export default new LogService()