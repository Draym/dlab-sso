import {
    ApiKeyResponse,
    ApplicationAllOwnResponse,
    ApplicationAllResponse,
    ApplicationCreateRequest,
    ApplicationDeleteRequest,
    ApplicationIsOwnerResponse,
    ApplicationNewApiKeyRequest,
    ApplicationDto, ApplicationGetRequest
} from "./dtos/applications"
import {
    AuthBodyRequest,
    AuthPathRequest,
    AuthRequest
} from "@d-lab/api-kit"

export default interface ApplicationApi {
    allByOwner(req: AuthRequest): Promise<ApplicationAllOwnResponse>
    get(req: AuthPathRequest<ApplicationGetRequest>): Promise<ApplicationDto>
    all(_: AuthRequest): Promise<ApplicationAllResponse>
    details(req: AuthRequest): Promise<ApplicationDto>
    isOwner(req: AuthRequest): Promise<ApplicationIsOwnerResponse>
    create(req: AuthBodyRequest<ApplicationCreateRequest>): Promise<ApiKeyResponse>
    delete(req: AuthBodyRequest<ApplicationDeleteRequest>): Promise<void>
    requestNewApiKey(req: AuthBodyRequest<ApplicationNewApiKeyRequest>): Promise<ApiKeyResponse>
}