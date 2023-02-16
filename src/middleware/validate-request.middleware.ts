import {plainToInstance} from 'class-transformer'
import {validate, ValidationError} from 'class-validator'
import {RequestHandler} from 'express'
import Errors from "../utils/errors/Errors"
import {isNotNull} from "@d-lab/api-kit"

const validateRequest = (
    type: any,
    value: string | 'body' | 'query' | 'params' = 'body',
    skipMissingProperties = false,
    whitelist = true,
    forbidNonWhitelisted = true,
): RequestHandler => {
    return (req, res, next) => {
        validate(plainToInstance(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted }).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                const message = errors.map((error: ValidationError) => {
                    if (isNotNull(error.constraints)) {
                        return Object.values(error.constraints!).join(" ")
                    } else {
                        return error.property
                    }
                }).join('\n')
                next(Errors.INVALID_Parameter(message))
            } else {
                next()
            }
        })
    }
}

const validateQueryRequest = (
    type: any,
    skipMissingProperties = false,
    whitelist = true,
    forbidNonWhitelisted = true,
): RequestHandler => {
    return validateRequest(type, "query", skipMissingProperties, whitelist, forbidNonWhitelisted)
}

export {
    validateRequest,
    validateQueryRequest
}