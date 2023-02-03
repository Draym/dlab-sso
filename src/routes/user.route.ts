import {Router} from "express"
import {Endpoint} from "../enums"
import UserController from "../controllers/user.controller"
import {CreateRequest, GetRequest, ListRequest} from "../api/dtos/user"
import authMiddleware from "../middleware/auth.middleware"
import hasRole from "../middleware/has-role.middleware"
import {handle, validatePathRequest, validateQueryRequest, validateRequest} from "@d-lab/api-kit"

const router = Router()
const ctrl = new UserController()

router.post(Endpoint.USER_Create, authMiddleware(), hasRole("admin"), validateRequest(CreateRequest), handle.bind(ctrl.create))
router.get(Endpoint.USER_List, authMiddleware(), hasRole("admin"), validateQueryRequest(ListRequest), handle.bind(ctrl.list))
router.get(Endpoint.USER_Get, authMiddleware(), hasRole("admin"), validatePathRequest(GetRequest), handle.bind(ctrl.get))

export default router