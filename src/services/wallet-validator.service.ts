import db from "../db/database"
import {WalletValidatorModel} from "../models"
import {nanoid} from "nanoid"
import Errors from "../utils/errors/Errors"
import EthSignature from "../utils/eth/EthSignature"
import {eq, Filter} from "@d-lab/api-kit"
import {isNotNull, throwIfNull} from "@d-lab/common-kit"

export default class WalletValidatorService {
    
    public async getBy(filter: Filter): Promise<WalletValidatorModel> {
        const validator = await this.findBy(filter)
        throwIfNull(validator, Errors.NOT_FOUND_WalletValidator(filter.stringify()))
        return validator!;
    }

    public async findBy(filter: Filter): Promise<WalletValidatorModel | null> {
        return await db.WalletValidators.findOne(filter.get())
    }
    
    public async create(address: string): Promise<WalletValidatorModel> {
        const validator = await this.findBy(eq({address}))
        if (isNotNull(validator)) {
            await validator!.update({
                nonce: nanoid()
            })
            return validator!
        } else {
            return await db.WalletValidators.create({
                address: address
            })
        }
    }

    public async validateSignatureForBind(address: string, email:string, signature: string) {
        const validator = await this.getBy(eq({address}))
        const message = EthSignature.bindMessage(address, email, validator.nonce)
        const extractedAddress: string = EthSignature.extractAddress(message, signature)
        if (address !== extractedAddress) {
            throw Errors.REJECTED_Signature()
        }
    }

    public async validateSignatureForUnbind(address: string, signature: string) {
        const validator = await this.getBy(eq({address}))
        const message = EthSignature.unbindMessage(address, validator.nonce)
        const extractedAddress: string = EthSignature.extractAddress(message, signature)
        if (address !== extractedAddress) {
            throw Errors.REJECTED_Signature()
        }
    }

    public async validateSignatureForLogin(address: string, signature: string) {
        const validator = await this.getBy(eq({address}))
        const message = EthSignature.loginMessage(address, validator.nonce)
        const extractedAddress: string = EthSignature.extractAddress(message, signature)
        if (address !== extractedAddress) {
            throw Errors.REJECTED_Signature()
        }
    }
}
