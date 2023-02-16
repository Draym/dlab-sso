import db from "../../db/database";
import Errors from "../../utils/errors/Errors";
import {TokenRefreshRequest, TokenResponse} from "../../api/dtos/auth"
import {BodyRequest, throwIfNull} from "@d-lab/api-kit"
import AuthResponse from "../../utils/reponse/auth.response"
import {Response} from "express"

export default class AuthTokenController {

    async refreshToken(req: BodyRequest<TokenRefreshRequest>, res: Response): Promise<TokenResponse> {
        const payload = req.body

        const existingRefreshToken = await db.RefreshTokens.findOne({
            where: {token: payload.refreshToken}
        })

        throwIfNull(existingRefreshToken, Errors.NOT_FOUND_RefreshToken())

        const user = await db.Users.findOne({
            where: {uuid: existingRefreshToken!.userUuid}
        })

        throwIfNull(user, Errors.NOT_FOUND_User('User not found for this refresh token.'))

       return await AuthResponse.success(user!, res)
    }
}