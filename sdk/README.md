# `@d-lab/sso`

- **[API Documentation](https://)**

This package provides the api sdk of the DLab SSO project

## Installation

```bash
npm i @d-lab/sso
```

## Domain
#### Production: https://sso.dlab.com

## Usage

```ts
import Client from '@d-lab/sso'

// 1. specify your domain
const domain = "https://sso.dlab.ovh"

// 2. create the client using domain
const client = new Client(domain)

// 3. login
const payload: LoginRequest = {
    email: "myemail@gmail.com",
    password: "12345"
}
const session: TokenResponse = await client.auth.login(payload)

// 4. verifying your auth and getting current user
const me: UserResponse = await client.auth.me()
```