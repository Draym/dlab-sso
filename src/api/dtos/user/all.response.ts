export interface UserData {
    id: number
    email: string | null
    uuid: string
    createdAt: Date
    updatedAt: Date
}

export default interface UserAllResponse {
    users: UserData[]
}