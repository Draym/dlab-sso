export default interface User {
    id: number
    identifier: string
    name: string
    email: string | null
    suspended: boolean
    createdAt: Date
    updatedAt: Date
}