import {NextFunction, Request, RequestHandler, Response} from "express"
import db from "../db/database"
import {AuthData, DataStoredInApiKey, DataStoredInToken, CallerData} from "../interfaces/reponse.interface"
import {
    logger,
    isNotNull,
    isNull,
    throwIfNot,
    throwIfNull,
    ApiAccessRequire,
    ApiMethodAccess,
    ApiScope
} from "@d-lab/api-kit"
import {config as jwtConfig} from "../config/jwt.config"
import jwt from "jsonwebtoken"
import {redisExists} from "../clients/redis.client"
import Errors from "../utils/errors/Errors"
import {UserModel} from "../models"
import {applicationScopeService, applicationService, userService} from "../services"

const {secret} = jwtConfig

declare global {
    namespace Express {
        interface Request {
            caller?: CallerData | undefined
            auth?: AuthData | undefined
        }
    }
}

export const authMiddleware = (scope: ApiScope | null = null): RequestHandler => {

    async function getUser(userId: number): Promise<UserModel> {
        const user = await db.Users.findByPk(userId)
        throwIfNull(user, Errors.NOT_FOUND_User("Authentication token is linked to an unknown user."))
        if (user!.suspended) {
            throw Errors.REQUIRE_Access()
        }
        return user!
    }

    async function verifyJWT(Authorization: string): Promise<DataStoredInToken> {
        let tokenData: DataStoredInToken
        try {
            tokenData = jwt.verify(Authorization, secret) as DataStoredInToken
        } catch (e) {
            if (isNotNull(e.message) && e.message.includes("jwt expired")) {
                throw Errors.EXPIRED_Token()
            } else {
                throw Errors.INVALID_Token(e.message || e)
            }
        }
        if (!await redisExists(tokenData.jti)) {
            throw Errors.INVALID_Token("disbanded")
        }
        return tokenData
    }

    async function verifyAppKey(ApiKey: string, apiRequire: ApiAccessRequire): Promise<DataStoredInApiKey> {
        const application = await applicationService.findByApiKey(ApiKey)
        throwIfNull(application, Errors.INVALID_ApiKey())
        const owner = await userService.getById(application!.ownerId)
        const scopes = await applicationScopeService.getScopes(application!.id)
        const modules = scopes.map(scope => scope.module)
        throwIfNot(modules.includes(scope!.module), Errors.REQUIRE_APP_Scope(scope!.module))
        throwIfNot(scope!.type == null || application!.type === scope!.type, Errors.REQUIRE_APP_TypeAccess(application!.type, scope!.type!))
        throwIfNot(ApiMethodAccess.hasAccess(application!.accessType, apiRequire), Errors.REQUIRE_APP_AccessRequire(apiRequire))

        return {
            appId: application!.id,
            ownerId: application!.ownerId,
            ownerIdentifier: owner.identifier,
            ownerEmail: owner.email
        }
    }

    return async <R extends Request>(req: R, res: Response, next: NextFunction) => {
        try {
            const bearerToken = req.header("Authorization")?.split("Bearer ")[1] || null
            const apiKey = req.header("x-api-key") || null

            if (isNotNull(scope) && isNotNull(apiKey)) {
                const apiRequire = ApiMethodAccess.getAccess(req.method)
                const appData = await verifyAppKey(apiKey!, apiRequire)
                req.auth = {
                    token: null,
                    apiKey: appData
                }
                req.caller = {
                    id: appData.ownerId,
                    identifier: appData.ownerIdentifier,
                    email: appData.ownerEmail
                }
            }

            if (isNotNull(bearerToken)) {
                const tokenData = await verifyJWT(bearerToken!)
                req.auth = {
                    token: tokenData,
                    apiKey: req.auth?.apiKey || null
                }
                req.caller = {
                    id: tokenData.userId,
                    identifier: tokenData.userIdentifier,
                    email: tokenData.userEmail
                }
            }
            if (isNull(bearerToken) && isNull(apiKey)) {
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
