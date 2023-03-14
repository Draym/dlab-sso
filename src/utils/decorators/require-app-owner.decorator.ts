import {applicationService} from "../../services"
import {isString, throwIfNull} from "@d-lab/api-kit"
import Errors from "../errors/Errors"

const requireAppOwner = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value
    descriptor.value = async (req: any) => {
        const reqId: number | string | null = req.body?.applicationId || req.query?.applicationId || req.path?.id
        throwIfNull(reqId, Errors.INVALID_Parameter("Missing applicationId"))
        const applicationId: number = isString(reqId) ? Number.parseInt(reqId! as string) : reqId as number
        await applicationService.requireOwnership(applicationId, req.caller.id)
        return originalMethod(req)
    }
}

export default requireAppOwner