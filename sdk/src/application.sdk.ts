import Sdk from "./sdk"
import {Auth, Http} from "@d-lab/common-kit"
import Endpoint from "./enums/endpoint.enum"
import {AppUserIsAllowedRequest, AppUserIsAllowedResponse} from "./api/dtos/applications/user"
import {GetSessionCB} from "../index"
import {ApplicationDto} from "./api/dtos/applications"

export default class ApplicationSdk extends Sdk {
    private readonly apiKey?: string

    constructor(domain: string, getSession?: GetSessionCB, apiKey?: string) {
        super(domain, getSession)
        this.apiKey = apiKey
    }

    details(apiKey?: string): Promise<ApplicationDto> {
        return new Promise((resolve, reject) => {
            Http.get(this.domain, Endpoint.APPLICATION_Details,
                Auth.apiKey(apiKey || this.apiKey),
                {},
                (data: ApplicationDto) => {
                    resolve(data)
                },
                (error) => {
                    reject(error)
                })
        })
    }

    isUserAllowed(query: AppUserIsAllowedRequest, auth?: Auth): Promise<AppUserIsAllowedResponse> {
        return new Promise((resolve, reject) => {
            Http.get(this.domain, Endpoint.APPLICATION_USER_IsAllowed,
                Auth.full(auth?.token || this.getSession?.()?.jwt, auth?.apiKey || this.apiKey),
                {query: {...query}},
                (data: AppUserIsAllowedResponse) => {
                    resolve(data)
                },
                (error) => {
                    reject(error)
                })
        })
    }
}