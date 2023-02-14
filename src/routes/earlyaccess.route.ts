import {Router} from "express"
import {Endpoint} from "../enums"
import {validateQueryRequest} from "../middleware/validate-request.middleware"
import EarlyAccessController from "../controllers/game-access/earlyaccess/earlyaccess.controller"
import {EarlyAccessIsAuthorizedRequest} from "../dtos/game-access/earlyaccess"

const router = Router()
const earlyAccessController = new EarlyAccessController()



router.get(Endpoint.EARLYACCESS_IsAuthorized, validateQueryRequest(EarlyAccessIsAuthorizedRequest), earlyAccessController.isAuthorized)


export default router