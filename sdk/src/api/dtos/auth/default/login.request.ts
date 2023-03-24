export default interface LoginRequest {
    email: string
    password: string
    shortSession: boolean | null

}