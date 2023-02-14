export default interface User {
    id: number
    uuid: string
    name: string
    email: string | null
    suspended: boolean
    createdAt: Date
    updatedAt: Date
}