import {IsNumberString} from "class-validator"

export default class AppUserFindRequest {
    @IsNumberString()
    public applicationId: string
}