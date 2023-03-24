import Sdk from "./sdk"
import {Auth, Http} from "@d-lab/common-kit"
import {LoginRequest, RegisterRequest} from "./api/dtos/auth/default"
import {AuthMeResponse, TokenResponse} from "./api/dtos/auth"
import {EmailSendCodeRequest, EmailVerifyCodeRequest, EmailVerifyCodeResponse} from "./api/dtos/email"
import Endpoint from "./enums/endpoint.enum"
import {GetSessionCB, SetSessionCB} from "../index"

export default class AuthSdk extends Sdk {
    private readonly setSession?: SetSessionCB

    constructor(domain: string, getSession?: GetSessionCB, setSession?: SetSessionCB) {
        super(domain, getSession)
        this.setSession = setSession
    }

    me(jwt?: string): Promise<AuthMeResponse> {
        return new Promise((resolve, reject) => {
            Http.get(this.domain, Endpoint.ME, Auth.token(jwt || this.getSession?.()?.jwt), {}, (data: AuthMeResponse) => {
                resolve(data)
            }, (error) => {
                reject(error)
            })
        })
    }

    login(body: LoginRequest): Promise<TokenResponse> {
        return new Promise((resolve, reject) => {
            Http.post(this.domain, Endpoint.LOGIN, null, {body}, (data: TokenResponse) => {
                this.setSession?.(data.token, data.refreshToken)
                resolve(data)
            }, (error) => {
                reject(error)
            })
        })
    }

    logout(): Promise<void> {
        return new Promise((resolve, reject) => {
            Http.post(this.domain, Endpoint.LOGOUT, Auth.token(this.getSession?.()?.jwt), {}, (data: void) => {
                this.setSession(null, null)
                resolve(data)
            }, (error) => {
                reject(error)
            })
        })
    }

    register(body: RegisterRequest): Promise<TokenResponse> {
        return new Promise((resolve, reject) => {
            Http.post(this.domain, Endpoint.REGISTER, null, {body}, (data: TokenResponse) => {
                this.setSession?.(data.token, data.refreshToken)
                resolve(data)
            }, (error) => {
                reject(error)
            })
        })
    }

    sendCodeForRegister(body: EmailSendCodeRequest): Promise<void> {
        return new Promise((resolve, reject) => {
            Http.post(this.domain, Endpoint.REGISTER_EMAIL_RequestCode, null, {body}, (data: void) => {
                resolve(data)
            }, (error) => {
                reject(error)
            })
        })
    }

    verifyCodeForRegister(query: EmailVerifyCodeRequest): Promise<EmailVerifyCodeResponse> {
        return new Promise((resolve, reject) => {
            Http.get(this.domain, Endpoint.REGISTER_EMAIL_VerifyCode, null, {query: {...query}}, (data: EmailVerifyCodeResponse) => {
                resolve(data)
            }, (error) => {
                reject(error)
            })
        })
    }
}