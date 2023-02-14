import {BodyRequest, PathRequest, QueryRequest} from "@d-lab/api-kit"

export default interface UserApi {
    create(req: BodyRequest<CreateRequest>): Promise<UserDto>
    list(req: QueryRequest<ListRequest>): Promise<UsersResponse>
    get(req: PathRequest<GetRequest>): Promise<UserDto>
}