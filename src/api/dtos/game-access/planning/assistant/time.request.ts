import {IsInt, Min} from "class-validator"

export default class TimeRequest {
    @IsInt()
    @Min(0)
    public hour: number
    @IsInt()
    @Min(0)
    public minute: number
    @IsInt()
    @Min(0)
    public second: number
}