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