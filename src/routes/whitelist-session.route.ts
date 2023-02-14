import {Router} from "express"
import {Endpoint, Role} from "../enums"
import WhitelistSessionController from "../controllers/game-access/whitelist/whitelist-session.controller"

const router = Router()
const whitelistSessionController = new WhitelistSessionController()



router.get(Endpoint.WHITELIST_SESSION_All, whitelistSessionController.all)

export default router