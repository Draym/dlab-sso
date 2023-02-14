import {VerificationCodeTarget} from "../enums"

export default interface VerificationCode {
    id: number
    email: string
    verificationCode: number
    validUntil: Date
    target: VerificationCodeTarget
    createdAt: Date
    updatedAt: Date
}
