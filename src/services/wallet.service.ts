import db from "../db/database"
import {WalletModel} from "../models"
import {isNotNull, throwIfNot, throwIfNotNull, throwIfNull} from "../utils/validators/checks"
import Errors from "../utils/errors/Errors"
import {Wallet} from "../interfaces"
import {WalletType} from "../enums"
import {walletHistoryService} from "."
import {nowUTC} from "../utils/date"

export default class WalletService {
    private wallets = db.Wallet

    public async getAll(): Promise<WalletModel[]> {
        return await this.wallets.findAll()
    }

    public async getByAddress(address: string): Promise<WalletModel> {
        const wallet = await this.findByAddress(address)
        throwIfNull(wallet, Errors.NOT_FOUND_WalletAddress(address))
        return wallet!
    }

    public async getByOwner(ownerIdentifier: string, type: WalletType): Promise<WalletModel> {
        const wallet = await this.findForOwner(ownerIdentifier, type)
        throwIfNull(wallet, Errors.NOT_FOUND_Wallet(`User(${ownerIdentifier}) has no bound wallet.`))
        return wallet!
    }

    public async findForOwner(ownerIdentifier: string, type: WalletType): Promise<WalletModel | null> {
        return await this.wallets.findOne({
            where: {
                ownerIdentifier: ownerIdentifier,
                type: type
            }
        })
    }

    public async findById(walletId: string): Promise<WalletModel | null> {
        return await this.wallets.findByPk(walletId)
    }

    public async findByAddress(address: string): Promise<WalletModel | null> {
        return await this.wallets.findOne({
            where: {address: address}
        })
    }

    public async findByIds(walletIds: string[]): Promise<WalletModel[]> {
        return await this.wallets.findAll({
            where: {id: walletIds}
        })
    }

    public async addressExists(address: string): Promise<boolean> {
        return isNotNull(await this.wallets.findOne({
            where: {address: address}
        }))
    }

    public async ownerHasWallet(ownerIdentifier: string, type: WalletType): Promise<boolean> {
        return isNotNull(await this.findForOwner(ownerIdentifier, type))
    }

    public async bindToUser(ownerIdentifier: string, address: string, type: WalletType): Promise<Wallet> {
        if (await this.addressExists(address)) {
            throw Errors.CONFLICT_WalletAddress(address)
        }
        const existingWallet = await this.findForOwner(ownerIdentifier, type)

        throwIfNotNull(existingWallet, Errors.CONFLICT_WalletBind(ownerIdentifier))

        const wallet = await this.wallets.create({
            address: address,
            type: type,
            ownerIdentifier: ownerIdentifier
        })
        await walletHistoryService.logAfterBind(wallet.address, wallet.type, wallet.ownerIdentifier, nowUTC())
        return wallet
    }

    public async unbindFromUser(ownerIdentifier: string, address: string, type: WalletType) {
        const ownerWallet = await this.findForOwner(ownerIdentifier, type)

        throwIfNull(ownerWallet, Errors.NOT_FOUND_Wallet(`owner[${ownerIdentifier}] has no bound wallet.`))
        throwIfNot(ownerWallet!.address === address, Errors.REJECTED_WalletUnbind(ownerIdentifier, address))

        await walletHistoryService.logAfterUnbind(
            ownerWallet!.address,
            ownerWallet!.type,
            ownerWallet!.ownerIdentifier,
            ownerWallet!.createdAt,
            nowUTC()
        )

        await ownerWallet!.destroy()
    }
}