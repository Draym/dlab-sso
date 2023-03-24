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

    constructor(domain: string, apiKey?: string, getSession?: GetSessionCB, setSession?: SetSessionCB) {
        this.domain = domain
        this.auth = new AuthSdk(domain, getSession, setSession)
        this.user = new UserSdk(domain, getSession)
        this.application = new ApplicationSdk(domain, getSession, apiKey)
    }
}

export {
    Client
}

export * from "./src/enums"
export * from "./src/api/dtos/applications/user"
export * from "./src/api/dtos/auth"
export * from "./src/api/dtos/auth/default"
export * from "./src/api/dtos/email"