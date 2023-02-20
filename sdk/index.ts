import AuthSdk from "./src/auth.sdk"
import ApplicationSdk from "./src/application.sdk"
import UserSdk from "./src/user.sdk"

export type SetSessionCB = (jwt: string, refreshToken: string) => void
export type GetSessionCB = () => Session
export type Session = {
    jwt: string | null
    refreshToken: string | null
}

class Client {
    private readonly domain: string
    public auth: AuthSdk
    public user: UserSdk
    public application: ApplicationSdk
    public jwt?: string
    public refreshToken: string

    constructor(domain: string, apiKey?: string, jwt?: string, refreshToken?: string) {
        this.domain = domain
        this.jwt = jwt
        this.refreshToken = refreshToken
        this.setSession = this.setSession.bind(this)
        this.getSession = this.getSession.bind(this)
        this.auth = new AuthSdk(domain, this.getSession, this.setSession)
        this.user = new UserSdk(domain,this.getSession)
        this.application = new ApplicationSdk(domain, this.getSession, apiKey)
    }

    setSession(jwt: string | null, refreshToken: string | null): void {
        this.jwt = jwt
        this.refreshToken = refreshToken
    }

    getSession(): Session {
        return {
            jwt: this.jwt,
            refreshToken: this.refreshToken
        }
    }
}

export {
    Client
}

export * from "../src/api/dtos/admin"
export * from "../src/api/dtos/applications"
export * from "../src/api/dtos/applications/user"
export * from "../src/api/dtos/auth"
export * from "../src/api/dtos/auth/default"
export * from "../src/api/dtos/auth/oauth/discord"
export * from "../src/api/dtos/auth/wallet/eth"
export * from "../src/api/dtos/discord"
export * from "../src/api/dtos/email"
export * from "../src/api/dtos/game-access/pbe"
export * from "../src/api/dtos/game-access/planning"
export * from "../src/api/dtos/game-access/planning/assistant"
export * from "../src/api/dtos/game-access/planning/session"
export * from "../src/api/dtos/log"
export * from "../src/api/dtos/newsletter"
export * from "../src/api/dtos/log"
export * from "../src/api/dtos/user"
export * from "../src/api/dtos/wallet/history"