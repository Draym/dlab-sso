import 'dotenv/config'

export const mailConfig = {
    key: process.env.MAIL_KEY!,
    from: process.env.MAIL_FROM!,
    fromName: process.env.MAIL_FROM_NAME!
}

export default mailConfig