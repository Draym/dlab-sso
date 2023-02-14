import {DiscordValidatorModel} from "../models"
import db from "../db/database"
import {isNull, throwIfNull} from "../utils/validators/checks"
import Errors from "../utils/errors/Errors"
import {nanoid} from "nanoid"

export default class DiscordValidatorService {
    public discordValidator = db.DiscordValidator

    public async getValidator(requestNonce: string, authKey: string): Promise<DiscordValidatorModel> {
        const wallet = await this.findValidator(requestNonce, authKey)
        throwIfNull(wallet, Errors.NOT_FOUND_DiscordValidator(requestNonce))
        return wallet!
    }

    public async findValidator(requestNonce: string, authKey: string): Promise<DiscordValidatorModel | null> {
        return await this.discordValidator.findOne({
            where: {
                requestNonce: requestNonce,
                authKey: authKey
            }
        })
    }

    public async findByDiscordId(discordId: string): Promise<DiscordValidatorModel | null> {
        return await this.discordValidator.findOne({
            where: {
                discordId: discordId
            }
        })
    }

    public async generate(discordId: string, discordToken: string, discordScope: string, requestNonce: string): Promise<DiscordValidatorModel> {
        const validator = await this.findByDiscordId(discordId)
        if (isNull(validator)) {
            return await this.discordValidator.create({
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