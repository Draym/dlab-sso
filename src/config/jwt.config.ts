import 'dotenv/config'

export const jwtConfig = {
    algorithms: ["HS256" as const],
    secret: process.env.JWT_SECRET!,
    secretRefresh: process.env.JWT_REFRESH_SECRET!
}

export default jwtConfig