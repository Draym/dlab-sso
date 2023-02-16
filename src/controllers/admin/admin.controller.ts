import {
    AdminBindWalletRequest,
    AdminCreateAccountRequest,
    AdminSuspendAccountRequest
} from "../../api/dtos/admin"
import {userCredentialsService, userRolesService, userService, walletService} from "../../services"
import {WalletType} from "../../enums"
import {AuthBodyRequest, isNotNull} from "@d-lab/api-kit"
import {UserDto} from "../../api/dtos/user"

export default class AdminController {
    async createAccount(req: AuthBodyRequest<AdminCreateAccountRequest>): Promise<UserDto> {
        const payload = req.body
        const user = await userService.create(payload.email)
        await userCredentialsService.create(user.uuid, payload.email, payload.password)
        if (isNotNull(payload.role)) {
            await userRolesService.update(user.id, payload.role!)
        }
        return {
            ...user,
            role: payload.role
        }
    }

    async suspendAccount(req: AuthBodyRequest<AdminSuspendAccountRequest>): Promise<void> {
        const payload = req.body
        await userService.suspendUser(payload.userId, payload.suspended)
    }

    async bindWalletToAccount(req: AuthBodyRequest<AdminBindWalletRequest>): Promise<void> {
        const payload = req.body
        const user = await userService.get(payload.userId)
        await walletService.bindToUser(user.uuid, payload.walletAddress, WalletType.ETH)
    }
}