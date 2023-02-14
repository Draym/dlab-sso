import {DiscordAccountModel} from "../models"
import db from "../db/database"
import Errors from "../utils/errors/Errors"
import {DiscordAccount} from "../interfaces"

export default class DiscordAccountService {
    public discordAccount = db.DiscordAccount

    public async getByDiscordId(discordId: string): Promise<DiscordAccountModel> {
        const account = await this.findByDiscordId(discordId)
        throwIfNull(account, Errors.NOT_FOUND_DiscordAccount(discordId))
        return account!
    }

    public async getByUuid(ownerIdentifier: string): Promise<DiscordAccountModel> {
        const account = await this.findByOwnerIdentifier(ownerIdentifier)
        throwIfNull(account, Errors.NOT_FOUND_DiscordAccount(ownerIdentifier))
        return account!
    }

    public async findByDiscordId(discordId: string): Promise<DiscordAccountModel | null> {
        return await this.discordAccount.findOne({
            where: {
                discordId: discordId
            }
        })
    }

    public async findByOwnerIdentifier(ownerIdentifier: string): Promise<DiscordAccountModel | null> {
        return await this.discordAccount.findOne({
            where: {
                ownerIdentifier: ownerIdentifier
            }
        })
    }

    public async hasBoundDiscord(ownerIdentifier: string): Promise<boolean> {
        return isNotNull(await this.findByOwnerIdentifier(ownerIdentifier))
    }

    public async bindToUser(userUuid: string, discordId: string, discordToken: string, discordEmail: string, scopes: string): Promise<DiscordAccountModel> {
        if (await this.hasBoundDiscord(userUuid)) {
            throw Errors.CONFLICT_DiscordBind(userUuid)
        }
        return await this.discordAccount.create({
            discordId: discordId,
            discordToken: discordToken,
            discordEmail: discordEmail,
            ownerIdentifier: userUuid,
            scopes: scopes
        })
    }

    public async unbindFromUser(ownerIdentifier: string): Promise<DiscordAccount> {
        const account = await this.getByUuid(ownerIdentifier)
        await account.destroy()
        return account
    }
}