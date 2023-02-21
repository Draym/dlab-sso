import {
    bindDiscordMessage,
    bindWalletMessage,
    resetPasswordMessage,
    updateEmailMessage,
    updatePasswordMessage,
    welcomeMessage
} from "./EmailTemplate"

export interface Mail {
    from: string
    to: string
    subject: string
    html: string
}

export default class Email {
    public static generateCode(size = 6) {
        const min = Math.pow(10, (size - 1))
        const max = Math.pow(10, (size))
        return Math.floor(Math.random() * (max - min) + min)
    }

    public static generateWelcomeMessage(from: string, to: string, code: number): Mail {
        return {
            from: from,
            to: to,
            subject: "DLab email verification",
            html: welcomeMessage(code)
        }
    }

    public static generateResetPasswordMessage(from: string, to: string, code: number): Mail {
        return {
            from: from,
            to: to,
            subject: "DLab email verification",
            html: resetPasswordMessage(code)
        }
    }

    public static generateUpdateEmailMessage(from: string, to: string, code: number): Mail {
        return {
            from: from,
            to: to,
            subject: "DLab email verification",
            html: updateEmailMessage(code)
        }
    }

    public static generateUpdatePasswordMessage(from: string, to: string, code: number): Mail {
        return {
            from: from,
            to: to,
            subject: "DLab email verification",
            html: updatePasswordMessage(code)
        }
    }
}