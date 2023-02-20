import Errors from "../../utils/errors/Errors"
import {UserAllRequest, UserAllResponse, UserFindRequest, UserDto} from "../../api/dtos/user"
import {userRolesService, userService} from "../../services"
import {User} from "../../interfaces"
import {AuthQueryRequest, eq, Filter, Page, QueryRequest, throwIfNull, toOptDate} from "@d-lab/api-kit"

export default class UserController {
    async find(req: AuthQueryRequest<UserFindRequest>): Promise<UserDto> {
        const payload = req.query
        const filter = new Filter()
        filter.equals({email: payload.email, id: payload.id, uuid: payload.uuid})
        const user: User | null = await userService.findBy(filter)
        throwIfNull(user, Errors.MISSING_Filter())
        const userRole = await userRolesService.findBy(eq({userId: user!.id}))
        return {
            id: user!.id,
            email: user!.email,
            uuid: user!.uuid,
            role: userRole?.role,
            createdAt: user!.createdAt,
            updatedAt: user!.updatedAt
        }
    }

    async all(req: QueryRequest<UserAllRequest>): Promise<UserAllResponse> {
        const payload = req.query
        const page = Page.from(payload)
        const filter = new Filter()
        filter.in({email: payload.emails, id: payload.ids, uuid: payload.uuids})
        filter.gt({createdAt: toOptDate(payload.registeredAfter)})
        filter.lt({createdAt: toOptDate(payload.registeredBefore)})
        const users = await userService.findAll(filter, page)
        return {
            users: users.map(user => {
                return {
                    id: user.id,
                    email: user.email,
                    uuid: user.uuid,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
            })
        }
    }
}