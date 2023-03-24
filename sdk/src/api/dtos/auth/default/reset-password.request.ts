export default interface PasswordResetRequest {
    email: string
    newPassword: string
    verificationCode: number
}