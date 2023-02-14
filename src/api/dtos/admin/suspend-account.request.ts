import {IsBoolean, IsInt, IsNotEmpty, IsString} from "class-validator"

export default class AdminSuspendAccountRequest {
    @IsInt()
    userId: number

    @IsBoolean()
    suspended: boolean

    @IsString()
    @IsNotEmpty({message: "Reason should not be empty."})
    reason: string
}