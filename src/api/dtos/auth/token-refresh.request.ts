import {IsJWT} from "class-validator"

export default class TokenRefreshRequest {
    @IsJWT({message: "RefreshToken is invalid, wrong format."})
    public refreshToken: string
}