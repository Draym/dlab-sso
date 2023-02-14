import {Role, SessionType} from "../enums"
import {StaffRoles} from "../enums/role.enum"
import {planningSessionService, userRolesService, userService} from "."
import {isNotNull, nowUTC} from "@d-lab/api-kit"
import {User} from "../interfaces"
import PbeAccess from "../interfaces/pbe-access.interface"

export default class PbeAccessService {

    async isAuthorizedByEmail(email: string): Promise<PbeAccess> {
        const user = await userService.findByEmail(email)
        return this.isAuthorized(user)
    }

    async isAuthorized(user: User | null): Promise<PbeAccess> {
        const now = nowUTC()
        const isStaff = isNotNull(user) && await userRolesService.hasAnyRole(user!.id, StaffRoles)
        const isPBETester = isNotNull(user) && await userRolesService.hasRole(user!.id, Role.EATester)
        const withinSession = await planningSessionService.withinSession(now, SessionType.EarlyAccess)

        return PbeAccessService.isAuthorized(isStaff, isPBETester, withinSession)
    }

    public static isAuthorized(isStaff:boolean, isPBETester: boolean, withinSession: boolean): PbeAccess {
        const isAuthorized = isStaff || (isPBETester && withinSession)
        return {isAuthorized, isOpen: withinSession, isPBETester, isStaff}
    }
}