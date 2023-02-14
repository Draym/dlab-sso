export default interface EmailVerifyCodeResponse{
    email: string
    verificationCode: number
    isValid: boolean
}