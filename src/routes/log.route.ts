import {Router} from "express"
import {Endpoint, Role} from "../enums"
import {GetRequest, ListRequest} from "../api/dtos/log"
import {handle, validatePathRequest, validateQueryRequest} from "@d-lab/api-kit"
import LogController from "../controllers/log/log.controller"
import authMiddleware from "../middleware/auth.middleware"
import hasRole from "../middleware/has-role.middleware"

const router = Router()
const ctrl = new LogController()

router.get(Endpoint.LOG_List, authMiddleware(), hasRole(Role.Operator), validateQueryRequest(ListRequest), handle.bind(ctrl.list))
router.post(Endpoint.LOG_Get, authMiddleware(), hasRole(Role.Operator), validatePathRequest(GetRequest), handle.bind(ctrl.get))

export default router