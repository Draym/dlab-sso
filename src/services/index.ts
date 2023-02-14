import PbeAccessService from "./pbe-access.service"
import TokenService from "./token.service"
import UserService from "./user.service"
import UserRoleService from "./user-role.service"
import VerificationCodeService from "./verification-code.service"
import WhitelistService from "./whitelist.service"
import WhitelistSessionService from "./whitelist-session.service"
import PlanningSessionService from "./planning-session.service"
import PlanningAssistantService from "./planning-assistant.service"
import WalletValidatorService from "./wallet-validator.service"
import WalletService from "./wallet.service"
import WalletHistoryService from "./wallet-history.service"
import NewsletterSubscriptionService from "./newsletter-subscription.service"
import ApplicationService from "./application.service"
import ApplicationScopeService from "./application-scope.service"
import DiscordAccountService from "./discord-account.service"
import DiscordValidatorService from "./discord-validator.service"
import ApplicationUserService from "./application-user.service"


const pbeAccessService = new PbeAccessService()
const tokenService = new TokenService()
const userService = new UserService()
const userRolesService = new UserRoleService()
const verificationCodeService = new VerificationCodeService()
const whitelistService = new WhitelistService()
const whitelistSessionService = new WhitelistSessionService()
const planningSessionService = new PlanningSessionService()
const planningAssistantService = new PlanningAssistantService()
const walletValidatorsService = new WalletValidatorService()
const walletService = new WalletService()
const walletHistoryService = new WalletHistoryService()
const newsletterSubscriptionService = new NewsletterSubscriptionService()
const applicationService = new ApplicationService()
const applicationScopeService = new ApplicationScopeService()
const applicationUserService = new ApplicationUserService()
const discordAccountService = new DiscordAccountService()
const discordValidatorService = new DiscordValidatorService()

export {
    pbeAccessService,
    tokenService,
    userService, userRolesService,
    verificationCodeService,
    whitelistService, whitelistSessionService,
    planningSessionService, planningAssistantService,
    walletService, walletValidatorsService, walletHistoryService,
    newsletterSubscriptionService,
    applicationService, applicationScopeService, applicationUserService,
    discordAccountService, discordValidatorService
}