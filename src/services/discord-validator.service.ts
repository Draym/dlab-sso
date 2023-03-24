import {DiscordValidatorModel} from "../models"
import db from "../db/database"
import Errors from "../utils/errors/Errors"
import {nanoid} from "nanoid"
import {eq, Filter} from "@d-lab/api-kit"
import {isNull, throwIfNull} from "@d-lab/common-kit"

export default class DiscordValidatorService {

    async find(id: number): Promise<DiscordValidatorModel | null> {
        return db.DiscordValidator.findByPk(id)
    }
    async get(id: number): Promise<DiscordValidatorModel> {
        const validator = await this.find(id)
        throwIfNull(validator, Errors.NOT_FOUND_DiscordValidator(`id[${id}]`))
        return validator!
    }

    public async getBy(filter: Filter): Promise<DiscordValidatorModel> {
        const validator = await this.findBy(filter)
        throwIfNull(validator, Errors.NOT_FOUND_DiscordValidator(filter.stringify()))
        return validator!
    }

    public async findBy(filter: Filter): Promise<DiscordValidatorModel | null> {
        return await db.DiscordValidator.findOne(filter.get())
    }

    public async generate(discordId: string, discordToken: string, discordScope: string, requestNonce: string): Promise<DiscordValidatorModel> {
        const validator = await this.findBy(eq({discordId}))
        if (isNull(validator)) {
            return await db.DiscordValidator.create({
                discordId: discordId,
                discordToken: discordToken,
                discordScope: discordScope,
                requestNonce: requestNonce,
                authKey: nanoid()
            })
        } else {
            await validator!.update({
                discordToken: discordToken,
                discordScope: discordScope,
                requestNonce: requestNonce,
                authKey: nanoid()
            })
            return validator!
        }
    }
}