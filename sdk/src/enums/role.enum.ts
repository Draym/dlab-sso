enum Role {
    Admin = "admin",
    Moderator = "moderator",
    Operator = "operator",
    Tester = "tester",
    EATester = "ea-tester",
    User = "user"
}

export const StaffRoles = [Role.Admin, Role.Moderator, Role.Operator, Role.Tester]
export const AdministrativeRoles = [Role.Admin, Role.Moderator]

const power: {[key: string]: number} = {}
power[Role.Admin] = 5
power[Role.Moderator] = 4
power[Role.Operator] = 3
power[Role.Tester] = 2
power[Role.EATester] = 1
power[Role.User] = 0

export const isAllowed = (role: Role, required: Role, strict: boolean = false): boolean => {
    if (role === required) {
        return true
    } else if (strict) {
        return false
    }
    return power[role] > power[required]
}

export default Role