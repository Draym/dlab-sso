import {SessionType} from "../enums"
import {isNotEmpty, isNotNull, throwIfNull} from "../utils/validators/checks"
import db from "../db/database"
import {PlanningSessionModel} from "../models"
import Errors from "../utils/errors/Errors"
import {Op} from "sequelize"

export default class PlanningSessionService {
    public planning = db.Planning

    public async all(): Promise<PlanningSessionModel[]> {
        return this.planning.findAll()
    }

    public async getById(sessionId: number): Promise<PlanningSessionModel> {
        const findSession = await this.planning.findByPk(sessionId)
        throwIfNull(findSession, Errors.NOT_FOUND_PlanningSessionId(sessionId))
        return findSession!
    }

    public async findById(sessionId: number): Promise<PlanningSessionModel | null> {
        return await this.planning.findByPk(sessionId)
    }

    public async findSessionForDate(type: SessionType, date: Date): Promise<PlanningSessionModel | null> {
        return await this.planning.findOne({
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
        return await this.planning.findOne({
            where: {
                start: start,
                end: end,
                type: type
            }
        })
    }

    public async findNext(type: SessionType, date: Date): Promise<PlanningSessionModel | null> {
        return this.planning.findOne({
            where: {
                start: {
                    [Op.gte]: date
                },
                type: type
            }
        })
    }

    public async findSessions(type: SessionType | undefined, before: Date | undefined = undefined, after: Date | undefined = undefined): Promise<PlanningSessionModel[]> {
        const filter = {}
        if (isNotEmpty(type)) {
            filter["type"] = type
        }
        if (isNotEmpty(before)) {
            filter["start"] = {
                [Op.lte]: before
            }
        }
        if (isNotEmpty(after)) {
            filter["start"] = {
                [Op.gte]: after
            }
        }
        return this.planning.findAll({
            where: filter
        })
    }

    public async withinSession(date: Date, type: SessionType): Promise<boolean> {
        return isNotNull(await this.findSessionForDate(type, date))
    }

    public async sessionExists(type: SessionType, start: Date, end: Date): Promise<boolean> {
        return isNotNull(await this.findSession(type, start, end))
    }

    public async create(type: SessionType, start: Date, end: Date): Promise<PlanningSessionModel> {
        if (await this.sessionExists(type, start, end)) {
            throw Errors.CONFLICT_PlanningSession(type)
        }
        return await this.planning.create({
            type: type,
            start: new Date(start),
            end: new Date(end)
        })
    }

    public async update(id: number, start: Date, end: Date): Promise<PlanningSessionModel> {
        const session = await this.getById(id)
        if (await this.sessionExists(session.type, start, end)) {
            throw Errors.CONFLICT_PlanningSession(session.type)
        }
        return await session.update({
            start: start,
            end: end
        })
    }

    public async delete(id: number): Promise<PlanningSessionModel> {
        const session = await this.getById(id)
        await session.destroy()
        return session
    }
}