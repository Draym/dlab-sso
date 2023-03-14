import {GetSessionCB} from "../index"

export default class Sdk {
    protected readonly domain: string
    protected readonly getSession?: GetSessionCB

    constructor(domain: string, getSession?: GetSessionCB) {
        this.domain = domain
        this.getSession = getSession
    }
}