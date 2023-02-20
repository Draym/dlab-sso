import {GetSubscribersResponse} from "./dtos/newsletter"
import {AuthRequest} from "@d-lab/api-kit"

export default interface NewsletterApi {
     getSubscribers(req: AuthRequest): Promise<GetSubscribersResponse>
     subscribe(req: AuthRequest): Promise<void>
     unsubscribe(req: AuthRequest): Promise<void>
}