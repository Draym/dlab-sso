import {DiscordAccountModel} from "../models"
import db from "../db/database"
import Errors from "../utils/errors/Errors"
import {DiscordAccount} from "../interfaces"
import {eq, Filter, isNotNull, throwIfNull} from "@d-lab/api-kit"

export default class DiscordAccountService {

    async find(id: number): Promise<DiscordAccountModel | null> {
        return db.DiscordAccount.findByPk(id)
    }
    async get(id: number): Promise<DiscordAccountModel> {
        const account = await this.find(id)
        throwIfNull(account, Errors.NOT_FOUND_DiscordAccount(`id[${id}]`))
        return account!
    }

    public async getBy(filter: Filter): Promise<DiscordAccountModel> {
        const account = await this.findBy(filter)
        throwIfNull(account, Errors.NOT_FOUND_DiscordAccount(filter.stringify()))
        return account!
    }

    public async findBy(filter: Filter): Promise<DiscordAccountModel | null> {
        return await db.DiscordAccount.findOne(filter.get())
    }

    public async hasBoundDiscord(userUuid: string): Promise<boolean> {
        return isNotNull(await this.findBy(eq({userUuid})))
    }

    public async bindToUser(userUuid: string, discordId: string, discordToken: string, discordEmail: string, scopes: string): Promise<DiscordAccountModel> {
        if (await this.hasBoundDiscord(userUuid)) {
            throw Errors.CONFLICT_DiscordBind(userUuid)
        }
        return await db.DiscordAccount.create({
            discordId: discordId,
            discordToken: discordToken,
            discordEmail: discordEmail,
            userUuid: userUuid,
            scopes: scopes
        })
    }

    public async unbindFromUser(userUuid: string): Promise<DiscordAccount> {
        const account = await this.getBy(eq({userUuid}))
        await account.destroy()
        return account
    }
}