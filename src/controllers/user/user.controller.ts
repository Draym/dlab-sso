import {AuthQueryRequest, QueryRequest} from "../../interfaces/api.interface"
import {NextFunction, Response} from "express"
import {isNotEmpty, throwIfNull} from "../../utils/validators/checks"
import Errors from "../../utils/errors/Errors"
import {UserAllRequest, UserAllResponse, UserFindRequest, UserResponse} from "../../dtos/user"
import {userRolesService, userService} from "../../services"
import {UserModel} from "../../models"
import {toDate, toOptDate} from "../../utils/date"
import {Filter} from "@delysium/api-kit"
import {User} from "../../interfaces"

export default class UserController {
     async find(req: AuthQueryRequest<UserFindRequest>): Promise<UserResponse> {
        try {
            const payload = req.query
            const filter = new Filter()
            filter.equals({email: payload.email, id: payload.userId, identifier: payload.userUuid})
            const user: User | null = await userService.findOne(filter)
            throwIfNull(user, Errors.MISSING_Filter())
            const userRole = await userRolesService.findByUserId(user!.id)
            res.status(200).json({
                id: user!.id,
                email: user!.email,
                identifier: user!.identifier,
                role: userRole?.role,
                createdAt: user!.createdAt,
                updatedAt: user!.updatedAt
            })
        } catch (error) {
            next(error)
        }
    }

     async all(req: QueryRequest<UserAllRequest>): Promise<UserAllResponse> {
        try {
            const payload = req.query
            const filter = new Filter()
            filter.in({email: payload.emails, id: payload.userIds, identifier: payload.userUuids})
            filter.gt({createdAt: toOptDate(payload.registeredAfter)})
            filter.lt({createdAt: toOptDate(payload.registeredBefore)})
            const users = await userService.findAll(filter)
            res.status(200).json({
                users: users.map(user => {
                    return {
                        id: user.id,
                        email: user.email,
                        identifier: user.identifier,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt
                    }
                })
            })
        } catch (error) {
            next(error)
        }
    }
}