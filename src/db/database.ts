import {Dialect, Sequelize} from "sequelize"
import config from "../config/db.config"

import {init as initLogModel} from "../models/log.model"
import {init as initUserModel} from "../models/user.model"
import {init as initUserRoleModel} from "../models/user-role.model"
import {init as initVerificationCodeModel} from "../models/verification-code.model"
import {init as initRefreshTokenModel} from "../models/refresh-token.model"
import {init as initWhitelistModel} from "../models/whitelist.model"
import {init as initPlanningSessionModel} from "../models/planning-session.model"
import {init as initWalletModel} from "../models/wallets.model"
import {init as initWalletHistoryModel} from "../models/wallet-history.model"
import {init as initWalletValidatorModel} from "../models/wallet-validator.model"
import {init as initNewsletterSubscriptionModel} from "../models/newsletter-subscription.model"
import {init as initApplicationModel} from "../models/application.model"
import {init as initApplicationScopeModel} from "../models/application-scope.model"
import {init as initDiscordAccountModel} from "../models/discord-account.model"
import {init as initDiscordValidatorModel} from "../models/discord-validator.model"
import {init as initApplicationUserModel} from "../models/application-user.model"

export const connectionParams = {
    username: config.username,
    password: config.password,
    dialect: "mysql" as Dialect,
    database: config.database,
    host: config.host,
    port: config.port,
    pool: {
        min: 0,
        max: 5,
    },
    define: {
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        underscored: true,
        freezeTableName: true,
    },
    timezone: "+08:00",
    logQueryParameters: process.env.NODE_ENV === "development",
    benchmark: true,
}

const sequelize = new Sequelize(connectionParams)

export {sequelize}

const db = {
    Logs: initLogModel(sequelize),
    Users: initUserModel(sequelize),
    VerificationCodes: initVerificationCodeModel(sequelize),
    RefreshTokens: initRefreshTokenModel(sequelize),
    UserRoles: initUserRoleModel(sequelize),
    Whitelist: initWhitelistModel(sequelize),
    Planning: initPlanningSessionModel(sequelize),
    Wallet: initWalletModel(sequelize),
    WalletHistory: initWalletHistoryModel(sequelize),
    WalletValidators: initWalletValidatorModel(sequelize),
    NewsletterSubscriptions: initNewsletterSubscriptionModel(sequelize),
    DiscordAccount: initDiscordAccountModel(sequelize),
    DiscordValidator: initDiscordValidatorModel(sequelize),
    Applications: initApplicationModel(sequelize),
    ApplicationScopes: initApplicationScopeModel(sequelize),
    ApplicationUsers: initApplicationUserModel(sequelize)
}

export default db
