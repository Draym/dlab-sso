import Sdk from "./sdk"
import {Auth, Http} from "@d-lab/api-kit"
import Endpoint from "@/enums/endpoint.enum"
import {AppUserIsAllowedRequest, AppUserIsAllowedResponse} from "@/dtos/applications/user"
import {GetSessionCB} from "../index"

export default class ApplicationSdk extends Sdk {
    private readonly apiKey?: string

    constructor(domain: string, getSession: GetSessionCB, apiKey?: string) {
        super(domain, getSession)
        this.apiKey = apiKey
    }

    isUserAllowed(query: AppUserIsAllowedRequest, apiKey?: string): Promise<AppUserIsAllowedResponse> {
        return new Promise((resolve, reject) => {
            Http.get(this.domain, Endpoint.APPLICATION_USER_IsAllowed,
                Auth.full(this.getSession().jwt, apiKey || this.apiKey),
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