import Errors from "../../utils/errors/Errors"
import {Regex, throwIf, throwIfNot} from "@d-lab/common-kit"

export default class Password {
    public static validate(password: string, passwordConfirm: string): void {
        throwIf(password != passwordConfirm, Errors.REJECTED_Password())

        throwIfNot(Regex.hasNumber(password), Errors.INVALID_Parameter("Password should contains at least 1 digit."))
        throwIfNot(Regex.hasLowerCase(password), Errors.INVALID_Parameter("Password should contains at least 1 lower case."))
        throwIfNot(Regex.hasUpperCase(password), Errors.INVALID_Parameter("Password should contains at least 1 upper case."))
    }

    public static getAuthorizedCharacters(): RegExp {
        return /[A-Za-z\d~`! @#$%^&*()_\-+={[}\]|\\:;"'<,>.?\/]$/
    }
}