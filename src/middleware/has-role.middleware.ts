import {Role} from "../enums"
import {RequestHandler} from "express"
import {logger, throwIfNull} from "@d-lab/api-kit";
import Errors from "../utils/errors/Errors";
import {userRolesService} from "../services"
import {isAllowed} from "../enums/role.enum"

const hasRole = (required: Role, strict = false): RequestHandler => {
    return async (req, res, next) => {
        try {
            const caller = req.caller

            throwIfNull(caller, Errors.REQUIRE_Token())

            const role = await userRolesService.getUserRole(caller!.id)

            if (isAllowed(role, required, strict)) {
                next()
            } else {
                throw Errors.REQUIRE_Role(required)
            }
        } catch (error) {
            next(error)
        }
    }
}

export default hasRole