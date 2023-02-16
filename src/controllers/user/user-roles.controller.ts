import {
    UserRoleAllRequest,
    UserRoleAllResponse,
    UserRoleBatchDeleteByEmailRequest,
    UserRoleBatchDeleteRequest,
    UserRoleBatchUpdateByEmailRequest,
    UserRoleBatchUpdateRequest,
    UserRoleDeleteRequest,
    UserRoleUpdateRequest
} from "../../api/dtos/user"
import {UserRoleModel} from "../../models"
import {userRolesService, userService} from "../../services"
import {Role} from "../../enums"
import Errors from "../../utils/errors/Errors"
import {associateBy, AuthBodyRequest, CallerData, eq, isNotNull, throwIf} from "@d-lab/api-kit"

export default class UserRolesController {
    async all(req: AuthBodyRequest<UserRoleAllRequest>): Promise<UserRoleAllResponse> {
        const payload = req.body
        let userRoles: UserRoleModel[]

        if (isNotNull(payload.role)) {
            userRoles = await userRolesService.findAll(eq({role: payload.role!}))
        } else {
            userRoles = await userRolesService.getAll()
        }
        const userIds = userRoles.map(userRole => userRole.userId)
        const users = associateBy(await userService.findByIds(userIds), "id")
        return {
            userRoles: userRoles.map(userRole => {
                return {
                    role: userRole.role,
                    userId: userRole.userId,
                    userEmail: users[userRole.userId]?.email
                }
            })
        }
    }

    async updateRole(req: AuthBodyRequest<UserRoleUpdateRequest>): Promise<void> {
        const payload = req.body
        const caller = req.caller
        await this.protectAdminRole(caller, payload.role)

        await userRolesService.update(payload.userId, payload.role)
    }

    async deleteRole(req: AuthBodyRequest<UserRoleDeleteRequest>): Promise<void> {
        const payload = req.body
        const caller = req.caller
        await this.protectAdminRole(caller, payload.role)

        await userRolesService.delete(payload.userId, payload.role)
    }

    async batchUpdateRole(req: AuthBodyRequest<UserRoleBatchUpdateRequest>): Promise<void> {
        const payload = req.body
        const caller = req.caller
        await this.protectAdminRole(caller, payload.role)

        for (const userId of payload.userIds) {
            await userRolesService.update(userId, payload.role)
        }
    }

    async batchDeleteRole(req: AuthBodyRequest<UserRoleBatchDeleteRequest>): Promise<void> {
        const payload = req.body
        const caller = req.caller
        await this.protectAdminRole(caller, payload.role)

        for (const userId of payload.userIds) {
            await userRolesService.delete(userId, payload.role)
        }
    }

    async batchUpdateRoleByEmail(req: AuthBodyRequest<UserRoleBatchUpdateByEmailRequest>): Promise<void> {
        const payload = req.body
        const caller = req.caller
        await this.protectAdminRole(caller, payload.role)

        const users = await userService.findByEmails(payload.userEmails)
        for (const user of users) {
            await userRolesService.update(user.id, payload.role)
        }
    }

    async batchDeleteRoleByEmail(req: AuthBodyRequest<UserRoleBatchDeleteByEmailRequest>): Promise<void> {
        const payload = req.body
        const caller = req.caller
        await this.protectAdminRole(caller, payload.role)

        const users = await userService.findByEmails(payload.userEmails)
        for (const user of users) {
            await userRolesService.delete(user.id, payload.role)
        }
    }

    private async protectAdminRole(caller: CallerData, role: Role) {
        if (role == Role.Admin) {
            const isAdmin = await userRolesService.hasRole(caller.id, Role.Admin)
            throwIf(!isAdmin, Errors.REQUIRE_Role(Role.Admin))
        }
    }
}