import 'dotenv/config'

export const mailConfig = {
    domain: process.env.MAIL_DOMAIN!,
    key: process.env.MAIL_KEY!,
    pubKey: process.env.MAIL_PUB_KEY!,
    from: process.env.MAIL_FROM!,
    fromName: process.env.MAIL_FROM_NAME!
}

export default mailConfig