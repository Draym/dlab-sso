export default interface RefreshToken {
  id: number
  userUuid: string
  token: string
  validUntil: Date
}
