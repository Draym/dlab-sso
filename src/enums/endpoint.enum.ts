enum Endpoint {
    USER_Create = "/users",
    USER_List = "/users",
    USER_Get = "/users/:userId",
    ME_USER_Get = "/me/user/:userId",
    LOG_List = "/logs",
    LOG_Get = "/logs/:logId",
}

export default Endpoint