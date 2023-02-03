import {CreateRequest, GetRequest, ListRequest, UserResponse, UsersResponse} from "../api/dtos/user"
import {LogEvent, LogScope} from "../enums"
import {AuthBodyRequest, Filter, Page, PathRequest, QueryRequest, toOptDate} from "@d-lab/api-kit"
import UserApi from "../api/user.api"
import logService from "../services/log.service"
import userService from "../services/user.service"

export default class UserController implements UserApi {

    async create(req: AuthBodyRequest<CreateRequest>): Promise<UserResponse> {
        const caller = req.user
        const payload = req.body
        const user = await userService.create(payload.name, payload.email)
        await logService.create(LogScope.USER, LogEvent.CREATE, user.identifier, caller.identifier)
        return {user}
    }

    async list(req: QueryRequest<ListRequest>): Promise<UsersResponse> {
        const params = req.query
        const page = Page.from(params)
        const filter = new Filter()
        filter.gt({createdAt: toOptDate(params.createdAfter)})
        filter.lt({createdAt: toOptDate(params.createdBefore)})
        const users = await userService.findAll(filter, page)
        return {
            users,
            ...page.result(users)
        }
    }

    async get(req: PathRequest<GetRequest>): Promise<UserResponse> {
        const payload = req.params
        const user = await userService.getById(Number.parseInt(payload.userId))
        return {
            user
        }
    }
}