export default interface RegisterRequest {
    email: string
    password: string
    passwordConfirm: string
    verificationCode: number
    newsletterSubscription: boolean
}