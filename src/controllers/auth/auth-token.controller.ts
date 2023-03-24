import db from "../../db/database";
import Errors from "../../utils/errors/Errors";
import {TokenRefreshRequest, TokenResponse} from "../../api/dtos/auth"
import {BodyRequest} from "@d-lab/api-kit"
import AuthResponse from "../../utils/reponse/auth.response"
import {Response} from "express"
import {userService} from "../../services"
import AuthTokenApi from "../../api/auth-token.api"
import {throwIfNull} from "@d-lab/common-kit"

export default class AuthTokenController implements AuthTokenApi {

    async refreshToken(req: BodyRequest<TokenRefreshRequest>, res: Response): Promise<TokenResponse> {
        const payload = req.body

        const existingRefreshToken = await db.RefreshTokens.findOne({
            where: {token: payload.refreshToken}
        })

        throwIfNull(existingRefreshToken, Errors.NOT_FOUND_RefreshToken())

        const user = await userService.find(existingRefreshToken!.userId)

        throwIfNull(user, Errors.NOT_FOUND_User('User not found for this refresh token.'))

       return await AuthResponse.success(user!, res)
    }
}