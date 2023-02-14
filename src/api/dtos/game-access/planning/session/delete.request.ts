import {IsInt} from "class-validator"

export default class SessionDeleteRequest {
    @IsInt()
    public id: number
}