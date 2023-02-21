import Errors from "../utils/errors/Errors"
import {Mail} from "../utils/email/Email"
import {mailConfig} from "../config/mail.config"
import {logger} from "@d-lab/api-kit"
import sgMail from "@sendgrid/mail"

export interface MailConfig {
    from: string
    fromName: string
}

export class Mailer {
    config: MailConfig

    constructor() {
        this.config = {
            from: mailConfig.from,
            fromName: mailConfig.fromName
        }
    }

    public async send(mail: Mail, target: string) {
        sgMail.setApiKey(mailConfig.key)
        sgMail.send(mail)
            .catch((error) => {
                logger.error(`[SendGrid]: ${JSON.stringify(error)}`)
                throw Errors.SERVICE_PROVIDER_ApiError(`Failed to send ${target}, please try again later.`)
            })
    }
}

const mailer = new Mailer()

export default mailer