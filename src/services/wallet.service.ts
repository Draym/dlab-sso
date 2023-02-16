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

    public async ownerHasWallet(userUuid: string, type: WalletType): Promise<boolean> {
        return isNotNull(await this.findBy(eq({userUuid, type})))
    }

    public async bindToUser(userUuid: string, address: string, type: WalletType): Promise<Wallet> {
        if (await this.addressExists(address)) {
            throw Errors.CONFLICT_WalletAddress(address)
        }
        const existingWallet = await this.findBy(eq({userUuid, type}))

        throwIfNotNull(existingWallet, Errors.CONFLICT_WalletBind(userUuid))

        const wallet = await this.wallets.create({
            address: address,
            type: type,
            userUuid: userUuid
        })
        await walletHistoryService.logAfterBind(wallet.address, wallet.type, wallet.userUuid, nowUTC())
        return wallet
    }

    public async unbindFromUser(userUuid: string, address: string, type: WalletType) {
        const wallet = await this.findBy(eq({userUuid, type}))

        throwIfNull(wallet, Errors.NOT_FOUND_Wallet(`owner[${userUuid}] has no bound wallet.`))
        throwIfNot(wallet!.address === address, Errors.REJECTED_WalletUnbind(userUuid, address))

        await walletHistoryService.logAfterUnbind(
            wallet!.address,
            wallet!.type,
            wallet!.userUuid,
            wallet!.createdAt,
            nowUTC()
        )

        await wallet!.destroy()
    }
}