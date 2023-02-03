import {RequestHandler} from "express"
import ssoClient from "../clients/sso.client"
import {logger, throwIfNull} from "@d-lab/api-kit"
import Errors from "../utils/errors/Errors"

export const hasRole = (role: string, strict: boolean = false): RequestHandler => {
    return async (req, res, next) => {
        try {
            const auth = req.auth

            throwIfNull(auth?.token, Errors.REQUIRE_Token())

            const isAllowed = await ssoClient.isAllowed(auth!.token!, role, strict)

            if (isAllowed.allowed) {
                next()
            } else {
                throw Errors.REQUIRE_Role(role)
            }
        } catch (error) {
            logger.error(error)
            next(error)
        }
    }
}

export default hasRole