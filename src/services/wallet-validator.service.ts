import db from "../db/database"
import {WalletValidatorModel} from "../models"
import {isNotNull, throwIfNull} from "../utils/validators/checks"
import {nanoid} from "nanoid"
import Errors from "../utils/errors/Errors"
import EthSignature from "../utils/eth/EthSignature"

export default class WalletValidatorService {
    private walletValidators = db.WalletValidators

    public async create(address: string): Promise<WalletValidatorModel> {
        const validator = await this.findByAddress(address)
        if (isNotNull(validator)) {
            await validator!.update({
                nonce: nanoid()
            })
            return validator!
        } else {
            return await this.walletValidators.create({
                address: address
            })
        }
    }

    public async validateSignatureForBind(address: string, email:string, signature: string) {
        const validator = await this.getByAddress(address)
        const message = EthSignature.bindMessage(address, email, validator.nonce)
        const extractedAddress: string = EthSignature.extractAddress(message, signature)
        if (address !== extractedAddress) {
            throw Errors.REJECTED_Signature()
        }
    }

    public async validateSignatureForUnbind(address: string, signature: string) {
        const validator = await this.getByAddress(address)
        const message = EthSignature.unbindMessage(address, validator.nonce)
        const extractedAddress: string = EthSignature.extractAddress(message, signature)
        if (address !== extractedAddress) {
            throw Errors.REJECTED_Signature()
        }
    }

    public async validateSignatureForReveal(address: string, signature: string) {
        const validator = await this.getByAddress(address)
        const message = EthSignature.revealMessage(address, validator.nonce)
        const extractedAddress: string = EthSignature.extractAddress(message, signature)
        if (address !== extractedAddress) {
            throw Errors.REJECTED_Signature()
        }
    }

    public async validateSignatureForUpdatePassword(address: string, signature: string) {
        const validator = await this.getByAddress(address)
        const message = EthSignature.updatePasswordMessage(address, validator.nonce)
        const extractedAddress: string = EthSignature.extractAddress(message, signature)
        if (address !== extractedAddress) {
            throw Errors.REJECTED_Signature()
        }
    }

    public async validateSignatureForUpdateEmail(address: string, signature: string) {
        const validator = await this.getByAddress(address)
        const message = EthSignature.updateEmailMessage(address, validator.nonce)
        const extractedAddress: string = EthSignature.extractAddress(message, signature)
        if (address !== extractedAddress) {
            throw Errors.REJECTED_Signature()
        }
    }

    public async validateSignatureForLogin(address: string, signature: string) {
        const validator = await this.getByAddress(address)
        const message = EthSignature.loginMessage(address, validator.nonce)
        const extractedAddress: string = EthSignature.extractAddress(message, signature)
        if (address !== extractedAddress) {
            throw Errors.REJECTED_Signature()
        }
    }

    public async getByAddress(address: string): Promise<WalletValidatorModel> {
        const validator = await this.findByAddress(address)
        throwIfNull(validator, Errors.NOT_FOUND_WalletValidator(address))
        return validator!;
    }

    public async findByAddress(address: string): Promise<WalletValidatorModel | null> {
        return await this.walletValidators.findOne({
            where: {address: address}
        })
    }
}
