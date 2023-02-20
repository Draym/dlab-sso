enum Endpoint {
    ADMIN_AccountCreate = "/admin/accounts",
    ADMIN_AccountSuspend = "/admin/accounts",
    ADMIN_BindWalletToAccount = "/admin/accounts/bind-wallet",
    APPLICATION_All = "/applications",
    APPLICATION_Get = "/applications/:id",
    APPLICATION_AllForOwner = "/applications/own",
    APPLICATION_Create = "/applications",
    APPLICATION_Delete = "/applications",
    APPLICATION_Details = "/applications/@",
    APPLICATION_NewApiKey = "/applications/new-api-key",
    APPLICATION_IsOwner = "/applications/is-owner",
    APPLICATION_SCOPE_Add = "/applications/scopes",
    APPLICATION_SCOPE_Delete = "/applications/scopes",
    APPLICATION_USER_Add = "/applications/users",
    APPLICATION_USER_Update = "/applications/users",
    APPLICATION_USER_Delete = "/applications/users",
    APPLICATION_USER_All = "/applications/users",
    APPLICATION_USER_IsAllowed = "/applications/users/is-allowed",
    LOGIN = "/auth/login",
    LOGOUT = "/auth/logout",
    REGISTER = "/auth/register",
    REGISTER_EMAIL_RequestCode = "/auth/register/request-email-code",
    REGISTER_EMAIL_VerifyCode = "/auth/register/verify-email-code",
    PASSWORD_RESET = "/auth/password/reset",
    PASSWORD_RESET_RequestCode = "/auth/password/request-email-code",
    PASSWORD_RESET_VerifyCode = "/auth/password/verify-email-code",
    TOKEN_REFRESH = "/auth/token/refresh",
    ETH_Challenge = "/auth/eth/challenge",
    ETH_Login = "/auth/eth/login",
    PBE_IsAuthorized = "/access/pbe/is-authorized",
    PLANNING_Get = "/access/planning",
    PLANNING_ASSISTANT_Create = "/access/planning/create-sessions",
    PLANNING_ASSISTANT_Delete = "/access/planning/delete-sessions",
    PLANNING_SESSION_Get = "/access/planning/sessions/:id",
    PLANNING_SESSION_FindNext = "/access/planning/sessions/next",
    PLANNING_SESSION_All = "/access/planning/sessions",
    PLANNING_SESSION_Create = "/access/planning/sessions",
    PLANNING_SESSION_Update = "/access/planning/sessions",
    PLANNING_SESSION_Delete = "/access/planning/sessions",
    ME = "/auth/@",
    ME_EMAIL_Update = "/user/@/email",
    ME_EMAIL_RequestCode = "/user/@/email/request-email-code",
    ME_EMAIL_VerifyCode = "/user/@/email/verify-email-code",
    ME_PASSWORD_Update = "/user/@/password",
    ME_PASSWORD_RequestCode = "/user/@/password/request-email-code",
    ME_PASSWORD_VerifyCode = "/user/@/password/verify-email-code",
    NEWSLETTER_GetSubscribers = "/newsletter/subscribers",
    NEWSLETTER_Subscribe = "/newsletter",
    NEWSLETTER_Unsubscribe = "/newsletter",
    USER_Find = "/user",
    USER_All = "/users",
    USER_ROLE_All = "/users/roles",
    USER_ROLE_Update = "/users/roles",
    USER_ROLE_Delete = "/users/roles",
    USER_ROLE_BatchUpdate = "/users/roles/batch",
    USER_ROLE_BatchDelete = "/users/roles/batch",
    WALLET_ETH_CHALLENGE_BindAccount = "/wallet/eth/challenge/bind-account",
    WALLET_ETH_CHALLENGE_UnbindAccount = "/wallet/eth/challenge/unbind-account",
    WALLET_ETH_BindAccount = "/wallet/eth/bind-to-account",
    WALLET_ETH_UnbindAccount = "/wallet/eth/unbind-from-account",
    WALLET_ETH_IsBound = "/wallet/eth/is-bound",
    WALLET_FindOwner = "/wallet/owner",
    WALLET_FindWallet = "/wallet",
    OAUTH_DISCORD_AuthorizeURL = "/oauth2/discord/authorize-url",
    OAUTH_DISCORD_Login = "/oauth2/discord/login",
    DISCORD_Details = "/discord/@",
    DISCORD_Unbind = "/discord/unbind",
    DISCORD_Bind = "/discord/bind",
    LOG_List = "/logs",
    LOG_Get = "/logs/:id",
}

export default Endpoint