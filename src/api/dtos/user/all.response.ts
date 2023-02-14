export interface UserData {
    id: number
    email: string
    identifier: string
    createdAt: Date
    updatedAt: Date
}

export default interface UserAllResponse {
    users: UserData[]
}