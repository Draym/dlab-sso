import 'dotenv/config'

export const cookieConfig = {
    cookieKey: process.env.COOKIE_KEY!,
    cookieDomain: process.env.COOKIE_DOMAIN!
}

export default cookieConfig