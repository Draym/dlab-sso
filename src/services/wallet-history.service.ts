import db from "../db/database"
import {WalletHistoryModel} from "../models"
import {WalletType} from "../enums"
import {isNotNull} from "../utils/validators/checks"
import {Op} from "sequelize"
import {toUTCDate} from "../utils/date"

export default class WalletHistoryService {

    private walletHistory = db.WalletHistory

    public async findByWallet(
        address: string,
        type: WalletType,
        at: Date
    ): Promise<WalletHistoryModel | null> {
        return await this.walletHistory.findOne({
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
        userIdentifier: string,
        type: WalletType,
        at: Date
    ): Promise<WalletHistoryModel | null> {
        return await this.walletHistory.findOne({
            where: {
                ownerIdentifier: userIdentifier,
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
        ownerIdentifier: string
    ): Promise<WalletHistoryModel | null> {
        return await this.walletHistory.findOne({
            where: {
                address: address,
                type: type,
                ownerIdentifier: ownerIdentifier,
                unbindAt: {
                    [Op.eq]: null
                }
            }
        })
    }

    public async logAfterBind(
        address: string,
        type: WalletType,
        ownerIdentifier: string,
        bindAt: Date
    ): Promise<WalletHistoryModel> {
        return await this.walletHistory.create({
            address: address,
            type: type,
            ownerIdentifier: ownerIdentifier,
            bindAt: toUTCDate(bindAt),
            unbindAt: null
        })
    }

    public async logAfterUnbind(
        address: string,
        type: WalletType,
        ownerIdentifier: string,
        bindAt: Date,
        unbindAt: Date
    ): Promise<WalletHistoryModel> {
        const currentLog = await this.findCurrentLog(address, type, ownerIdentifier)

        if (isNotNull(currentLog)) {
            await currentLog!.update({
                unbindAt: unbindAt
            })
            return currentLog!
        } else {
            return await this.walletHistory.create({
                address: address,
                type: type,
                ownerIdentifier: ownerIdentifier,
                bindAt: toUTCDate(bindAt),
                unbindAt: toUTCDate(unbindAt)
            })
        }
    }
}