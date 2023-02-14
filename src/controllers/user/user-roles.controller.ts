import {AuthBodyRequest, Empty} from "../../interfaces/api.interface"
import {NextFunction, Response} from "express"
import {
    UserRoleAllRequest,
    UserRoleAllResponse,
    UserRoleBatchDeleteByEmailRequest,
    UserRoleBatchDeleteRequest,
    UserRoleBatchUpdateByEmailRequest,
    UserRoleBatchUpdateRequest,
    UserRoleDeleteRequest,
    UserRoleUpdateRequest
} from "../../dtos/user"
import {isNotNull, throwIf} from "../../utils/validators/checks"
import {UserRoleModel} from "../../models"
import {associateBy} from "../../utils/map"
import {userRolesService, userService} from "../../services"
import {Role} from "../../enums"
import Errors from "../../utils/errors/Errors"
import {CallerData} from "../../interfaces/reponse.interface"

export default class UserRolesController {
     async all(req: AuthBodyRequest<UserRoleAllRequest>): Promise<UserRoleAllResponse> {
        try {
            const payload = req.body
            let userRoles: UserRoleModel[]

            if (isNotNull(payload.role)) {
                userRoles = await userRolesService.findByRole(payload.role!)
            } else {
                userRoles = await userRolesService.findAll()
            }
            const userIds = userRoles.map(userRole => userRole.userId)
            const users = associateBy(await userService.findByIds(userIds), "id")
            res.status(200).json({
                userRoles : userRoles.map(userRole => { return {
                    role: userRole.role,
                    userId: userRole.userId,
                    userEmail: users[userRole.userId]?.email
                }})
            })
        } catch (error) {
            next(error)
        }
    }

     async updateRole(req: AuthBodyRequest<UserRoleUpdateRequest>): Promise<Empty> {
        try {
            const payload = req.body
            const caller = req.caller
            await this.protectAdminRole(caller, payload.role)

            await userRolesService.update(payload.userId, payload.role)
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

     async deleteRole(req: AuthBodyRequest<UserRoleDeleteRequest>): Promise<Empty> {
        try {
            const payload = req.body
            const caller = req.caller
            await this.protectAdminRole(caller, payload.role)

            await userRolesService.delete(payload.userId, payload.role)
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

     async batchUpdateRole(req: AuthBodyRequest<UserRoleBatchUpdateRequest>): Promise<Empty> {
        try {
            const payload = req.body
            const caller = req.caller
            await this.protectAdminRole(caller, payload.role)

            for (const userId of payload.userIds) {
                await userRolesService.update(userId, payload.role)
            }
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

     async batchDeleteRole(req: AuthBodyRequest<UserRoleBatchDeleteRequest>): Promise<Empty> {
        try {
            const payload = req.body
            const caller = req.caller
            await this.protectAdminRole(caller, payload.role)

            for (const userId of payload.userIds) {
                await userRolesService.delete(userId, payload.role)
            }
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

     async batchUpdateRoleByEmail(req: AuthBodyRequest<UserRoleBatchUpdateByEmailRequest>): Promise<Empty> {
        try {
            const payload = req.body
            const caller = req.caller
            await this.protectAdminRole(caller, payload.role)

            const users = await userService.findByEmails(payload.userEmails)
            for (const user of users) {
                await userRolesService.update(user.id, payload.role)
            }
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

     async batchDeleteRoleByEmail(req: AuthBodyRequest<UserRoleBatchDeleteByEmailRequest>): Promise<Empty> {
        try {
            const payload = req.body
            const caller = req.caller
            await this.protectAdminRole(caller, payload.role)

            const users = await userService.findByEmails(payload.userEmails)
            for (const user of users) {
                await userRolesService.delete(user.id, payload.role)
            }
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

    private async protectAdminRole(caller: CallerData, role: Role) {
        if (role == Role.Admin) {
            const isAdmin = await userRolesService.hasRole(caller.id, Role.Admin)
            throwIf(!isAdmin, Errors.REQUIRE_Role(Role.Admin))
        }
    }
}