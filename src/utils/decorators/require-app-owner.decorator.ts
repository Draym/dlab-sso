import {applicationService} from "../../services"
import {AuthBodyRequest} from "@d-lab/api-kit"

const requireAppOwner = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value
    descriptor.value = async (req: AuthBodyRequest<{applicationId: number}>) => {
        await applicationService.requireOwnership(req.body.applicationId, req.caller.id)
        return originalMethod(req)
    }
}

export default requireAppOwner