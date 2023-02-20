import Token from "../utils/jwt/Token"
import db from "../db/database"
import {DataStoredInToken, isNotNull} from "@d-lab/api-kit"
import {TokenData} from "../interfaces"

export default class TokenService {

    public async newRefreshToken(userId: number, userUuid: string): Promise<TokenData> {
        const existingRefreshToken = await db.RefreshTokens.findOne({
            where: {userId: userId}
        })
        if (isNotNull(existingRefreshToken)) {
            await existingRefreshToken!.destroy()
        }
        const newRefreshToken = await Token.generateRefreshToken(userId, userUuid)

        await db.RefreshTokens.create({
            userId: userId,
            token: newRefreshToken.token,
            validUntil: new Date(Date.now() + newRefreshToken.expiresIn),
        })
        return newRefreshToken
    }

    public async newToken(userId: number, userUuid: string, shortSession = false): Promise<TokenData> {
        return await Token.generate(userId, userUuid, shortSession)
    }

    public async destroyToken(token: DataStoredInToken): Promise<void> {
        const existingRefreshToken = await db.RefreshTokens.findOne({
            where: {userId: token.userId}
        })
        if (isNotNull(existingRefreshToken)) {
            await existingRefreshToken!.destroy()
        }
    }
}