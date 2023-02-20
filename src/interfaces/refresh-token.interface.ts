export default interface RefreshToken {
  id: number
  userId: number
  token: string
  validUntil: Date
}
