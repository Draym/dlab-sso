import Mailgun from "mailgun.js"
import FormData from "form-data"
import Errors from "../utils/errors/Errors"
import {Mail} from "../utils/email/Email"
import {mailConfig} from "../config/mail.config"
import {logger} from "@d-lab/api-kit"

export interface MailgunConfig {
    from: string
    fromName: string
}

const MailGunInstance = new Mailgun(FormData)

export class Mailer {
    client: ReturnType<typeof MailGunInstance.client>
    config: MailgunConfig

    constructor() {
        this.client = MailGunInstance.client({
            key: mailConfig.key,
            public_key: mailConfig.pubKey,
            username: "api",
        })
        this.config = {
            from: mailConfig.from,
            fromName: mailConfig.fromName
        }
        return this
    }

    public async send(mail: Mail, target: string) {
        try {
            await this.client.messages.create(mailConfig.domain, mail)
        } catch (e) {
            logger.error(`[MailGun]: ${JSON.stringify(e)}`)
            throw Errors.SERVICE_PROVIDER_ApiError(`Failed to send ${target}, please try again later.`)
        }
    }

}

const mailer = new Mailer()

export default mailer