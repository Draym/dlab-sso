import {tokenService} from "../../services"
import {User} from "../../interfaces"
import {Response} from "express"
import {TokenResponse} from "../../api/dtos/auth"
import cookieConfig from "../../config/cookie.config"

export default class AuthResponse {
    public static async success(user: User, res: Response, shortSession = false): Promise<TokenResponse> {

        const newRefreshToken = await tokenService.newRefreshToken(user.id, user.uuid)
        const newToken = await tokenService.newToken(user.id, user.uuid, shortSession)

        this.setCookieResponse(res, newToken.token, newToken.expiresIn * 1000)

        return {
            token: newToken.token,
            refreshToken: newRefreshToken.token,
            expireAt: new Date(Date.now() + (newToken.expiresIn * 1000)),
            user: {
                id: user.id,
                uuid: user.uuid,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        }
    }

    public static setCookieResponse(res: Response, token: string, expiresIn: number) {
        res.cookie(cookieConfig.cookieKey, token, {maxAge: expiresIn, domain: cookieConfig.cookieDomain})
    }

    public static clearCookieResponse(res: Response) {
        res.clearCookie(cookieConfig.cookieKey, {domain: cookieConfig.cookieDomain, path: "/"});
    }
}