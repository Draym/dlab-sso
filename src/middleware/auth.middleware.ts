import {NextFunction, Request, RequestHandler, Response} from "express"
import {AuthData, CallerData, isNotNull, logger} from "@d-lab/api-kit"
import ssoClient from "../clients/sso.client"
import Errors from "../utils/errors/Errors"

declare global {
    namespace Express {
        interface Request {
            auth?: AuthData | undefined
            user?: CallerData | undefined
        }
    }
}

export const authMiddleware = (): RequestHandler => {

    async function verifyJWT(Authorization: string): Promise<CallerData> {
        const me = await ssoClient.me(Authorization)
        return {
            id: me.id,
            identifier: me.identifier,
            email: me.email
        }
    }

    return async <R extends Request>(req: R, res: Response, next: NextFunction) => {
        try {
            const bearerToken = req.header("Authorization")?.split("Bearer ")[1] || null

            if (isNotNull(bearerToken)) {
                const caller = await verifyJWT(bearerToken!)
                req.auth = {
                    token: bearerToken!,
                    apiKey: null
                }
                req.user = caller
            } else {
                throw Errors.REQUIRE_Token()
            }
            next()
        } catch (error) {
            logger.error(error)
            next(error)
        }
    }
}

export default authMiddleware
