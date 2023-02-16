import { NextFunction, Request, Response } from "express"
import {HttpException, logger} from "@d-lab/api-kit"

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    const status: number = error.status || 500
    const message: string = error.message || "Something went wrong"

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`)
    res.status(status).json({message: message, code: error.code})
}

export default errorMiddleware
