import {CreateRequest, GetRequest, ListRequest, UserResponse, UsersResponse} from "./dtos/user"
import {BodyRequest, PathRequest, QueryRequest} from "@d-lab/api-kit"

export default interface UserApi {
    create(req: BodyRequest<CreateRequest>): Promise<UserResponse>
    list(req: QueryRequest<ListRequest>): Promise<UsersResponse>
    get(req: PathRequest<GetRequest>): Promise<UserResponse>
}