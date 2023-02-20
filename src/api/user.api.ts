import {UserAllRequest, UserAllResponse, UserFindRequest, UserDto} from "./dtos/user"
import {AuthQueryRequest,QueryRequest} from "@d-lab/api-kit"

export default interface UserApi {
     find(req: AuthQueryRequest<UserFindRequest>): Promise<UserDto>
     all(req: QueryRequest<UserAllRequest>): Promise<UserAllResponse>
}