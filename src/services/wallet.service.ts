import db from "../db/database"
import {WalletModel} from "../models"
import Errors from "../utils/errors/Errors"
import {Wallet} from "../interfaces"
import {WalletType} from "../enums"
import {walletHistoryService} from "."
import {eq, Filter, isNotNull, nowUTC, throwIfNot, throwIfNotNull, throwIfNull} from "@d-lab/api-kit"

export default class WalletService {
    private wallets = db.Wallet

    public async all(): Promise<WalletModel[]> {
        return await this.wallets.findAll()
    }

    async find(id: number): Promise<WalletModel | null> {
        return db.Wallet.findByPk(id)
    }
    async get(id: number): Promise<WalletModel> {
        const wallet = await this.find(id)
        throwIfNull(wallet, Errors.NOT_FOUND_Wallet(`id[${id}]`))
        return wallet!
    }

    public async getBy(filter: Filter): Promise<WalletModel> {
        const wallet = await this.findBy(filter)
        throwIfNull(wallet, Errors.NOT_FOUND_DiscordValidator(filter.stringify()))
        return wallet!
    }

    public async findBy(filter: Filter): Promise<WalletModel | null> {
        return await db.Wallet.findOne(filter.get())
    }

    public async addressExists(address: string): Promise<boolean> {
        return isNotNull(await this.wallets.findOne({
            where: {address: address}
        }))
    }

    public async ownerHasWallet(userId: number, type: WalletType): Promise<boolean> {
        return isNotNull(await this.findBy(eq({userId: userId, type})))
    }

    public async bindToUser(userId: number, address: string, type: WalletType): Promise<Wallet> {
        if (await this.addressExists(address)) {
            throw Errors.CONFLICT_WalletAddress(address)
        }
        const existingWallet = await this.findBy(eq({userId, type}))

        throwIfNotNull(existingWallet, Errors.CONFLICT_WalletBind(`id[${userId}]`))

        const wallet = await this.wallets.create({
            address: address,
            type: type,
            userId: userId
        })
        await walletHistoryService.logAfterBind(wallet.address, wallet.type, wallet.userId, nowUTC())
        return wallet
    }

    public async unbindFromUser(userId: number, address: string, type: WalletType) {
        const wallet = await this.findBy(eq({userId, type}))

        throwIfNull(wallet, Errors.NOT_FOUND_Wallet(`owner[${userId}] has no bound wallet.`))
        throwIfNot(wallet!.address === address, Errors.REJECTED_WalletUnbind(userId, address))

        await walletHistoryService.logAfterUnbind(
            wallet!.address,
            wallet!.type,
            wallet!.userId,
            wallet!.createdAt,
            nowUTC()
        )

        await wallet!.destroy()
    }
}