import db from "../db/database"
import Email from "../utils/email/Email"
import {VerificationCodeModel} from "../models"
import {isNotNull, throwIfNull} from "../utils/validators/checks";
import {VerificationCodeTarget} from "../enums";
import Errors from "../utils/errors/Errors";
import {nowUTC} from "../utils/date"

const EMAIL_VERIFICATION_CODE_TIMEOUT = 10 * 60 * 1000 // 10 minutes
const EMAIL_VERIFICATION_CODE_RESTRICTION = 60 * 1000 // 1 minute

export default class VerificationCodeService {

    public async createCode(email: string, target: VerificationCodeTarget): Promise<number> {
        const code = Email.generateCode()
        const restricted = new Date(Date.now() - EMAIL_VERIFICATION_CODE_RESTRICTION)

        const verificationCode = await db.VerificationCodes.findOne({
            where: {
                email: email,
                target: target
            },
        })

        if (isNotNull(verificationCode)) {
            if (restricted < verificationCode!.updatedAt) {
                throw Errors.RESTRICTED_VerificationCode(EMAIL_VERIFICATION_CODE_RESTRICTION / 1000, "seconds")
            }
            await verificationCode!.update({
                email: email,
                verificationCode: code,
                validUntil: new Date(Date.now() + EMAIL_VERIFICATION_CODE_TIMEOUT),
            })
        } else {
            await db.VerificationCodes.create({
                email: email,
                verificationCode: code,
                validUntil: new Date(Date.now() + EMAIL_VERIFICATION_CODE_TIMEOUT),
                target: target
            })
        }
        return code
    }

    public async findCode(email: string, verificationCode: number): Promise<VerificationCodeModel | null> {
        return await db.VerificationCodes.findOne({
            where: {
                email: email,
                verificationCode: verificationCode,
            },
        })
    }

    public async checkValidity(email: string, verificationCode: number, target: VerificationCodeTarget): Promise<VerificationCodeModel> {
        const now = nowUTC()
        const code = await db.VerificationCodes.findOne({
            where: {
                email: email,
                target: target
            },
            order: [ [ 'id', 'DESC' ]]
        })
        throwIfNull(code, Errors.NOT_FOUND_VerificationCode())

        if (code!.verificationCode !== verificationCode) {
            throw Errors.INVALID_VerificationCode(email)
        }
        if (code!.target !== target) {
            throw Errors.REJECTED_VerificationCode(email, target)
        }
        if (now > code!.validUntil) {
            throw Errors.EXPIRED_VerificationCode()
        }
        return code!
    }

    public async checkValidityAndDestroy(email: string, verificationCode: number, target: VerificationCodeTarget): Promise<void> {
        const code = await this.checkValidity(email, verificationCode, target)
        await code.destroy()
    }
}