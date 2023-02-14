import {RedisKey, SessionType, WhitelistStatus} from "../enums"
import db from "../db/database"
import {WhitelistModel} from "../models"
import {StaffRoles} from "../enums/role.enum"
import {planningSessionService, userRolesService, userService} from "."
import {WhitelistAccess} from "../interfaces"

export default class WhitelistService {

    public async getStatus(): Promise<WhitelistStatus> {
        const status = await redisGet(RedisKey.WhitelistStatus)
        if (isNull(status)) {
            return WhitelistStatus.FreeForAll
        }
        return status as WhitelistStatus
    }

    public async getAll(): Promise<WhitelistModel[]> {
        return await db.Whitelist.findAll()
    }

    public async isWhitelisted(email: string): Promise<boolean> {
        const whitelist = await db.Whitelist.findOne({
            where: {email: email}
        })
        return whitelist != null
    }

    public async addEmails(emails: string[]): Promise<void> {
        const whitelistItems = await db.Whitelist.findAll()
        const existingEmails = whitelistItems.map(item => item.email.toLowerCase())

        const toAdd = Array.from(new Set(emails.filter(email => !existingEmails.includes(email.toLowerCase()))))

        const whitelistedEmails: { email: string }[] = toAdd.map(email => {
            return {email: email}
        })
        await db.Whitelist.bulkCreate(whitelistedEmails)
    }

    public async deleteEmails(emails: string[]): Promise<void> {
        await db.Whitelist.destroy({
            where: {email: emails}
        })
    }

    public async deleteAllEmails(): Promise<void> {
        await db.Whitelist.destroy({
            where: {}
        })
    }

    public async activate(): Promise<void> {
        await redisAdd(RedisKey.WhitelistStatus, WhitelistStatus.Activated)
    }

    public async close(): Promise<void> {
        await redisAdd(RedisKey.WhitelistStatus, WhitelistStatus.Closed)
    }

    public async openForAll(): Promise<void> {
        await redisAdd(RedisKey.WhitelistStatus, WhitelistStatus.FreeForAll)
    }

    async isAuthorized(email: string): Promise<{ isStaff: boolean, isAuthorized: boolean, isWhitelisted: boolean, isOpen: boolean }> {
        const now = nowUTC()
        const user = await userService.findByEmail(email)
        const isWhitelisted = await this.isWhitelisted(email)
        const status = await this.getStatus()
        const withinSession = await planningSessionService.withinSession(now, SessionType.Whitelist)
        const isStaff = isNotNull(user) && await userRolesService.hasAnyRole(user!.id, StaffRoles)
        return WhitelistLogic.isAuthorized(isWhitelisted, status, withinSession, isStaff)
    }

    public static isAuthorized(isWhitelisted: boolean, status: WhitelistStatus, withinSession: boolean, isStaff: boolean): WhitelistAccess {
        let isAuthorized = false
        let isOpen = false

        switch (status) {
            case WhitelistStatus.Activated:
                isAuthorized = withinSession && isWhitelisted
                isOpen = withinSession
                break
            case WhitelistStatus.FreeForAll:
                isAuthorized = true
                isOpen = true
                break
            case WhitelistStatus.Closed:
                isAuthorized = false
                isOpen = false
                break
        }

        if (isStaff) {
            isAuthorized = true
        }
        return {isStaff, isAuthorized, isWhitelisted, isOpen}
    }
}