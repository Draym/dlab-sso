import adminRoute from "./admin.route"
import applicationRoute from "./application.route"
import applicationScopeRoute from "./application-scope.route"
import applicationUserRoute from "./application-user.route"
import authRoute from "./auth.route"
import authDefaultRoute from "./auth-default.route"
import authEthRoute from "./auth-eth.route"
import authPasswordRoute from "./auth-password.route"
import authTokenRoute from "./auth-token.route"
import discordRoute from "./discord.route"
import logRoute from "./log.route"
import newsletterRoute from "./newsletter.route"
import oauthDiscordRoute from "./oauth-discord.route"
import pbeAccessRoute from "./pbe-access.route"
import planningRoute from "./planning.route"
import planningAssistantRoute from "./planning-assistant.route"
import planningSessionRoute from "./planning-session.route"
import userRoute from "./user.route"
import userMeRoute from "./user-me.route"
import userRolesRoute from "./user-roles.route"
import walletRoute from "./wallet.route"
import walletEthRoute from "./wallet-eth.route"

const routers = [
    adminRoute,
    applicationRoute,
    applicationScopeRoute,
    applicationUserRoute,
    authRoute,
    authDefaultRoute,
    authEthRoute,
    authPasswordRoute,
    authTokenRoute,
    discordRoute,
    logRoute,
    newsletterRoute,
    oauthDiscordRoute,
    pbeAccessRoute,
    planningRoute,
    planningAssistantRoute,
    planningSessionRoute,
    userRoute,
    userMeRoute,
    userRolesRoute,
    walletRoute,
    walletEthRoute,
]

export default routers