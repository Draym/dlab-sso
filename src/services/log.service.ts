import {LogEvent, LogScope} from "../enums"
import db from "../db/database"
import {Filter, Page, throwIfNull} from "@d-lab/api-kit"
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
    async findAll(filter: Filter, page: Page): Promise<Log[]> {
        return db.Logs.findAll(page.paginate(filter.get()))
    }
    async findById(id: number): Promise<LogModel | null> {
        return db.Logs.findByPk(id)
    }
    async getById(id: number): Promise<LogModel> {
        const log = await this.findById(id)
        throwIfNull(log, Errors.NOT_FOUND_Log(`NotFound for id[${id}]`))
        return log!
    }
}

export default new LogService()