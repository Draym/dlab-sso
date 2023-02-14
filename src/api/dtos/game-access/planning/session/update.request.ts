import {IsDateString, IsInt} from "class-validator"

export default class SessionUpdateRequest {
    @IsInt()
    public id: number
    @IsDateString(undefined, {message: "Invalid date format."})
    public start: string
    @IsDateString(undefined, {message: "Invalid date format."})
    public end: string
}