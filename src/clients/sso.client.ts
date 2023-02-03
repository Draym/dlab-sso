import {CallerData} from "@d-lab/api-kit"

// use your own SSO client here, following for code compilation only
const ssoClient = {
    me: async (jwt: string): Promise<CallerData> => {
        return {
            id: 1,
            identifier: "admin",
            email: "admin@project.com"
        }
    },
    isAllowed: async (jwt:string, requiredRole: string, strict: boolean): Promise<{allowed: boolean}> => {
        return {
            allowed: true
        }
    }
}

export default ssoClient
