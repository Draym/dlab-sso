import db from "../db/database"
import {WalletHistoryModel} from "../models"
import {WalletType} from "../enums"
import {Op} from "sequelize"
import {isNotNull, toUTCDate} from "@d-lab/api-kit"

export default class WalletHistoryService {


    public async findByWallet(
        address: string,
        type: WalletType,
        at: Date
    ): Promise<WalletHistoryModel | null> {
        return await db.WalletHistory.findOne({
            where: {
                address: address,
                type: type,
                bindAt: {
                    [Op.lte]: at
                },
                unbindAt: {
                    [Op.or]: [
                        {[Op.gte]: at},
                        {[Op.eq]: null}
                    ]
                }
            }
        })
    }

    public async findByOwner(
        userUuid: string,
        type: WalletType,
        at: Date
    ): Promise<WalletHistoryModel | null> {
        return await db.WalletHistory.findOne({
            where: {
                userUuid: userUuid,
                type: type,
                bindAt: {
                    [Op.lte]: at
                },
                unbindAt: {
                    [Op.or]: [
                        {[Op.gte]: at},
                        {[Op.eq]: null}
                    ]
                }
            }
        })
    }

    public async findCurrentLog(
        address: string,
        type: WalletType,
        userUuid: string
    ): Promise<WalletHistoryModel | null> {
        return await db.WalletHistory.findOne({
            where: {
                address: address,
                type: type,
                userUuid: userUuid,
                unbindAt: {
                    [Op.eq]: null
                }
            }
        })
    }

    public async logAfterBind(
        address: string,
        type: WalletType,
        userUuid: string,
        bindAt: Date
    ): Promise<WalletHistoryModel> {
        return await db.WalletHistory.create({
            address: address,
            type: type,
            userUuid: userUuid,
            bindAt: toUTCDate(bindAt),
            unbindAt: null
        })
    }

    public async logAfterUnbind(
        address: string,
        type: WalletType,
        userUuid: string,
        bindAt: Date,
        unbindAt: Date
    ): Promise<WalletHistoryModel> {
        const currentLog = await this.findCurrentLog(address, type, userUuid)

        if (isNotNull(currentLog)) {
            await currentLog!.update({
                unbindAt: unbindAt
            })
            return currentLog!
        } else {
            return await db.WalletHistory.create({
                address: address,
                type: type,
                userUuid: userUuid,
                bindAt: toUTCDate(bindAt),
                unbindAt: toUTCDate(unbindAt)
            })
        }
    }
}