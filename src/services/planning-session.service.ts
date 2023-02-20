import {SessionType} from "../enums"
import db from "../db/database"
import {PlanningSessionModel} from "../models"
import Errors from "../utils/errors/Errors"
import {Op} from "sequelize"
import {Filter, isNotNull, throwIfNull} from "@d-lab/api-kit"
import {PlanningSession} from "../interfaces"

export default class PlanningSessionService {

    public async all(): Promise<PlanningSession[]> {
        return db.Planning.findAll()
    }

    public async get(id: number): Promise<PlanningSessionModel> {
        const findSession = await db.Planning.findByPk(id)
        throwIfNull(findSession, Errors.NOT_FOUND_PlanningSession(`id[${id}]`))
        return findSession!
    }

    public async find(id: number): Promise<PlanningSessionModel | null> {
        return await db.Planning.findByPk(id)
    }

    public async findAll(filter: Filter): Promise<PlanningSession[]> {
        return await db.Planning.findAll(filter.get())
    }

    public async findSessionForDate(type: SessionType, date: Date): Promise<PlanningSessionModel | null> {
        return await db.Planning.findOne({
            where: {
                start: {
                    [Op.lte]: date
                },
                end: {
                    [Op.gt]: date
                },
                type: type
            }
        })
    }

    public async findSession(type: SessionType, start: Date, end: Date): Promise<PlanningSessionModel | null> {
        return await db.Planning.findOne({
            where: {
                start: start,
                end: end,
                type: type
            }
        })
    }

    public async findNext(type: SessionType, date: Date): Promise<PlanningSessionModel | null> {
        return db.Planning.findOne({
            where: {
                start: {
                    [Op.gte]: date
                },
                type: type
            }
        })
    }

    public async withinSession(date: Date, type: SessionType): Promise<boolean> {
        return isNotNull(await this.findSessionForDate(type, date))
    }

    public async sessionExists(type: SessionType, start: Date, end: Date): Promise<boolean> {
        return isNotNull(await this.findSession(type, start, end))
    }

    public async create(serviceId: number, type: SessionType, start: Date, end: Date): Promise<PlanningSessionModel> {
        if (await this.sessionExists(type, start, end)) {
            throw Errors.CONFLICT_PlanningSession(type)
        }
        return await db.Planning.create({
            type: type,
            start: new Date(start),
            end: new Date(end),
            serviceId: serviceId
        })
    }

    public async update(id: number, start: Date, end: Date): Promise<PlanningSessionModel> {
        const session = await this.get(id)
        if (await this.sessionExists(session.type, start, end)) {
            throw Errors.CONFLICT_PlanningSession(session.type)
        }
        return await session.update({
            start: start,
            end: end
        })
    }

    public async delete(id: number): Promise<PlanningSessionModel> {
        const session = await this.get(id)
        await session.destroy()
        return session
    }
}