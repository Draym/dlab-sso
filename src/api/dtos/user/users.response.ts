import UserDto from "./user.dto"
import {PageResponse} from "@d-lab/api-kit";

export default interface UsersResponse extends PageResponse {
    users: UserDto[]
}