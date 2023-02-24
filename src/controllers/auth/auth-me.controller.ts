import {AuthMeResponse} from "../../api/dtos/auth"
import {userRolesService, userService, walletService} from "../../services"
import {WalletType} from "../../enums"
import {StaffRoles} from "../../enums/role.enum"
import {AuthRequest, eq} from "@d-lab/api-kit"
import AuthMeApi from "../../api/auth-me.api"

export default class AuthMeController implements AuthMeApi {
    async getMe(req: AuthRequest): Promise<AuthMeResponse> {
        const caller = req.caller
        const user = await userService.get(caller.id)
        const role = await userRolesService.getUserRole(caller.id)
        const wallets = await walletService.all(eq({userId: user.id, type: WalletType.ETH}))
        return {
            id: user.id,
            uuid: user.uuid,
            email: user.email,
            role: {
                role: role,
                isStaff: StaffRoles.includes(role)
            },
            wallets: wallets.map(it => ({
                address: it.address,
                type: it.type
            })),
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    }
}