import {IsString, Matches, MaxLength, MinLength} from "class-validator"
import {Match} from "../../../validators/match.decorator"
import Password from "../../../utils/validators/password"

export default class MePasswordUpdateRequest {

    @IsString()
    @MinLength(8, {message: "Password should contains at least 8 characters."})
    @MaxLength(25, {message: "Password should contains at maximum 25 characters."})
    @Matches(Password.getAuthorizedCharacters(), {message: 'Password contains unauthorized characters.'})
    public newPassword: string

    @IsString()
    @Match("newPassword")
    public newPasswordConfirm: string
}