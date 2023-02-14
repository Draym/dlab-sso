export default interface AuthEmail {
    id: number
    userUuid: number
    email: string | null
    password: string
    createdAt: Date
    updatedAt: Date
}