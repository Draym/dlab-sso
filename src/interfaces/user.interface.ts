export default interface User {
    id: number
    uuid: string
    email: string | null
    suspended: boolean
    createdAt: Date
    updatedAt: Date
}