import {IsBoolean, IsEmail, IsInt, IsString, Matches, MaxLength, MinLength} from "class-validator"
import Password from "../../../../utils/validators/password"
import {Match} from "../../../../utils/decorators/match.decorator"

export default class RegisterRequest {
    @IsEmail(undefined, {message: "Please input a valid email address."})
    public email: string

    @IsString()
    @MinLength(8, {message: "Password should contains at least 8 characters."})
    @MaxLength(25, {message: "Password should contains at maximum 25 characters."})
    @Matches(Password.getAuthorizedCharacters(), {message: 'Password contains unauthorized characters.'})
    public password: string

    @IsString()
    @Match("password")
    public passwordConfirm: string

    @IsInt()
    public verificationCode: number

    @IsBoolean()
    public newsletterSubscription: boolean
}