# `@delysium/sso`

- **[API Documentation](https://sso-stg.delysium.com/api/docs/)**

This package provides the api sdk of the Delysium project

## Installation

> 🚨 Please make sure to add this NPM token in your `.npmrc` file:
> `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`.
> 
> You can do so by running the following command:
> 
> ```bash
> echo "//registry.npmjs.org/:_authToken=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" >> .npmrc
> ```

```bash
yarn add @delysium/sso
```

## Domain
#### Staging: https://sso-stg.delysium.com
#### Production: https://sso.delysium.com

## Usage

```ts
import Client from '@delysium/sso'
import UserResponse from "./user.response";
import {EmptyTokenRequest} from "./request";

// 1. specify your domain
const domain = "https://sso-stg.delysium.com"

// 2. create the client and call init when the user wallet is connected
const client = new Client(domain)


// example of getting current user
const request: EmptyTokenRequest = {token: "user token"}
const me: UserResponse = await client.userMe(request)
```