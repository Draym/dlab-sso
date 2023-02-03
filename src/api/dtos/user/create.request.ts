import {IsString} from "class-validator"

export default class CreateRequest {
    @IsString()
    public name: string
    @IsString()
    public email: string
}