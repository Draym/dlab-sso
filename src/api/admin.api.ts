import {AuthBodyRequest} from "@d-lab/api-kit"
import {AdminBindWalletRequest, AdminCreateAccountRequest, AdminSuspendAccountRequest} from "./dtos/admin"
import {UserDto} from "./dtos/user"

export default interface AdminApi {
    createAccount(req: AuthBodyRequest<AdminCreateAccountRequest>): Promise<UserDto>
    suspendAccount(req: AuthBodyRequest<AdminSuspendAccountRequest>): Promise<void>
    bindWalletToAccount(req: AuthBodyRequest<AdminBindWalletRequest>): Promise<void>
}