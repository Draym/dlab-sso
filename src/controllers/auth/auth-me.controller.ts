import {AuthMeResponse} from "../../api/dtos/auth"
import {userRolesService, userService, walletService} from "../../services"
import {WalletType} from "../../enums"
import {StaffRoles} from "../../enums/role.enum"
import {AuthRequest, eq} from "@d-lab/api-kit"

export default class AuthMeController {
    async getMe(req: AuthRequest): Promise<AuthMeResponse> {
        const caller = req.caller
        const user = await userService.get(caller.id)
        const role = await userRolesService.getUserRole(caller.id)
        const primaryEthWallet = await walletService.findBy(eq({userId: user.id, type: WalletType.ETH}))
        return {
            id: user.id,
            uuid: user.uuid,
            email: user.email,
            role: {
                role: role,
                isStaff: StaffRoles.includes(role)
            },
            wallets: {
                ethWallet: primaryEthWallet?.address
            },
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    }
}