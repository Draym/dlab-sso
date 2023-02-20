import {Router} from "express"
import {Endpoint} from "../enums"
import {validateQueryRequest} from "../middleware/validate-request.middleware"
import PbeController from "../controllers/game-access/pbe/pbe.controller"
import {PbeIsAuthorizedRequest} from "../api/dtos/game-access/pbe"
import {handle} from "@d-lab/api-kit"
import authMiddleware from "../middleware/auth.middleware"

const router = Router()
const ctrl = new PbeController()

router.get(Endpoint.PBE_IsAuthorized, authMiddleware(), handle.bind(ctrl.isAuthorized))
router.get(Endpoint.PBE_IsAuthorizedByEmail, validateQueryRequest(PbeIsAuthorizedRequest), handle.bind(ctrl.isAuthorizedByEmail))

export default router