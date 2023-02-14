import {TokenData as TokenData} from "../../interfaces"
import jwt from "jsonwebtoken"
import {nanoid} from "nanoid"
import {DataStoredInToken} from "@d-lab/api-kit"
import jwtConfig from "../../config/jwt.config"

const {secret, secretRefresh, algorithms} = jwtConfig

const expiration1month = 30 * 24 * 60 * 60
const expiration24hours = 24 * 60 * 60
const expiration1minute = 60

export default class Token {

    public static getIdentifier(userId: number): string {
        return `${userId}_${nanoid()}`
    }

    public static async generateRefreshToken(userId: number, userUuid: string, ): Promise<TokenData> {
        return this.createAny(userId, userUuid, secretRefresh, expiration1month)
    }

    public static async generate(userId: number, userUuid: string, shortSession: boolean): Promise<TokenData> {
        return this.createAny(userId, userUuid, secret, shortSession ? expiration24hours : expiration1month)
    }

    private static async createAny(userId: number, userUuid: string, secret: string, expiresIn: number): Promise<TokenData> {
        const dataStoredInToken: DataStoredInToken = {
            userId: userId,
            userUuid: userUuid,
            jti: this.getIdentifier(userId)
        }

        const token = jwt.sign(dataStoredInToken, secret, {
            algorithm: algorithms[0],
            expiresIn,
        })

        return {
            expiresIn,
            token,
            jti: dataStoredInToken.jti
        }
    }
}