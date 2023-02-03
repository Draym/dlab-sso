import {isNotEmpty, PageRequest} from "@d-lab/api-kit";
import {IsDateString, ValidateIf} from "class-validator"

export default class ListRequest extends PageRequest {
    @IsDateString()
    @ValidateIf((object, value) => isNotEmpty(value))
    createdAfter: string | null
    @IsDateString()
    @ValidateIf((object, value) => isNotEmpty(value))
    createdBefore: string | null
}