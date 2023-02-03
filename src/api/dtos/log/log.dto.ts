export default interface LogDto {
    id: number
    scope: string
    event: string
    message: string | null
    code: string | null
    createdBy: string
    createdAt: Date
}