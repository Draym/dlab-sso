import {Router} from "express"
import AdminController from "../controllers/admin/admin.controller"
import authMiddleware from "../middleware/auth.middleware"
import {validateRequest} from "../middleware/validate-request.middleware"
import hasRole from "../middleware/has-role.middleware"
import {Role, Endpoint} from "../enums"
import {
    AdminBindWalletRequest,
    AdminCreateAccountRequest,
    AdminSuspendAccountRequest,
} from "../api/dtos/admin"
import {handle} from "@d-lab/api-kit"

const router = Router()
const ctrl = new AdminController()

router.post(Endpoint.ADMIN_AccountCreate, validateRequest(AdminCreateAccountRequest), authMiddleware(), hasRole(Role.Admin), handle.bind(ctrl.createAccount))
router.put(Endpoint.ADMIN_AccountSuspend, validateRequest(AdminSuspendAccountRequest), authMiddleware(), hasRole(Role.Admin), handle.bind(ctrl.suspendAccount))
router.put(Endpoint.ADMIN_BindWalletToAccount, validateRequest(AdminBindWalletRequest), authMiddleware(), hasRole(Role.Admin), handle.bind(ctrl.bindWalletToAccount))

export default router