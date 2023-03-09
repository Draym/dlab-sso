enum Role {
    Admin = "admin",
    Moderator = "moderator",
    Operator = "operator",
    Tester = "tester",
    PbeTester = "pbe-tester",
    User = "user"
}

export const StaffRoles = [Role.Admin, Role.Moderator, Role.Operator, Role.Tester]
export const AdministrativeRoles = [Role.Admin, Role.Moderator]

const power: {[key: string]: number} = {}
power[Role.Admin] = 5
power[Role.Moderator] = 4
power[Role.Operator] = 3
power[Role.Tester] = 2
power[Role.PbeTester] = 1
power[Role.User] = 0

export const isStaff = (role: Role): boolean => {
    return StaffRoles.includes(role)
}
export const isAdministrative = (role: Role): boolean => {
    return AdministrativeRoles.includes(role)
}

export const isAllowed = (role: Role, required: Role, strict = false): boolean => {
    if (role === required) {
        return true
    } else if (strict) {
        return false
    }
    return power[role] > power[required]
}

export default Role